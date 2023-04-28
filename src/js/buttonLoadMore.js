import createImageCard from "./createImageCard";



const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;

export default function buttonLoadMore() {
  currentPage += 1;
createImageCard();
  // loadMoreBtn.hidden = true;

  imagesApiService.fetchImages().then(({ hits, totalHits }) => {
    imagesApiService.incrementLoadedHits(hits);
    loadMoreBtn.enable();

    if (totalHits <= imagesApiService.loadedHits) {
      loadMoreBtn.hide();
      endOfSearch();
    }

    createGalleryMarkup(hits);
    gallery.refresh();
  });
}
