import './css/styles.css';
import ImagesApi from './js/imagesApi';
import createImageCard from './js/createImageCard';

// import buttonLoadMore from './js/buttonLoadMore';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  galleryWrapper: document.querySelector('.gallery'),

  // loadMoreBtn: document.querySelector('.load-more'),

  wrapper: document.querySelector('.wrapper'),
};

const imagesApi = new ImagesApi();
const gallery = new SimpleLightbox('.gallery a');

const optionsForObserver = {
  rootMargin: '300px',
};
const observer = new IntersectionObserver(onEntry, optionsForObserver);

refs.form.addEventListener('submit', onFormSubmit);

// refs.loadMoreBtn.addEventListener('click', buttonLoadMore);

function onFormSubmit(event) {
  event.preventDefault();

  imagesApi.query = event.currentTarget.elements.searchQuery.value.trim();

  imagesApi.resetHits();
  imagesApi.resetPage();

  clearGallery();

  if (!imagesApi.query) {
    return errorWarning();
  }

  imagesApi.getImage().then(({ hits, totalHits }) => {
    if (!hits.length) {
      return errorWarning();
    }

    observer.observe(refs.wrapper);

    imagesApi.incrHits(hits);
    createImageCard(hits);
    successAlert(totalHits);
    gallery.refresh();

    //  refs.loadMoreBtn.hidden = false;

    if (hits.length === totalHits) {
      observer.unobserve(refs.wrapper);
      endAlert();
    }
  });

  observer.unobserve(refs.wrapper);
}

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && imagesApi.query) {
      imagesApi
        .getImage()
        .then(({ hits, totalHits }) => {
          imagesApi.incrHits(hits);
          if (totalHits <= imagesApi.hits) {
            observer.unobserve(refs.wrapper);
            endAlert();
          }

          createImageCard(hits);
          scrollGallery();
          gallery.refresh();
        })
        .catch(error => {
          console.warn(`${error}`);
        });
    }
  });
}

function clearGallery() {
  refs.galleryWrapper.innerHTML = '';
}

//============== Alerts =================//

function successAlert(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

function errorWarning() {
  // refs.loadMoreBtn.hidden = true;

  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function endAlert() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

//================= Scroll ================//

function scrollGallery() {
  const { height } =
    refs.galleryWrapper.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
