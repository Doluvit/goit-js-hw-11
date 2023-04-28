// import ImagesApi from "./imagesApi";
// import createImageCard from "./createImageCard";
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const gallery = new SimpleLightbox('.gallery a');
// const imagesApi = new ImagesApi();

// let currentPage = 1;

// const loadMoreBtn = document.querySelector('.load-more');

//   export default function buttonLoadMore() {
//     currentPage += 1;
//     imagesApi
//       .getImage(currentPage)
//       .then(({ hits, totalHits }) => {
//         imagesApi.incrHits(hits);
//         if (totalHits <= imagesApi.hits) {
//           loadMoreBtn.hidden = true;
//           endAlert();
//         }

//         createImageCard(hits);
//         gallery.refresh();
//       })
//       .catch(error => {
//         console.warn(`${error}`);
//       });
//   };
