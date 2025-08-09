import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  lightbox,
  showLoader,
  showLoadMoreButton,
  smoothScrollAfterAppend,
} from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const LoadMoreButton = document.querySelector('.load-more');
let currentQuery = '';
let currentPage = 1;

form.addEventListener('submit', async e => {
  e.preventDefault();

  currentQuery = e.target.elements['search-text'].value.trim();

  if (!currentQuery) {
    alert('Please enter search query');
    return;
  }

  currentPage = 1;

  clearGallery();
  showLoader();
  hideLoadMoreButton();
  try {
    const { data } = await getImagesByQuery(currentQuery);

    if (data.totalHits === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });

      return;
    }

    gallery.innerHTML = createGallery(data.hits);
    lightbox.refresh();
    smoothScrollAfterAppend();

    const shown = currentPage * PER_PAGE;
    if (shown < data.totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: `${error.message}`,
      position: 'topRight',
    });
  } finally {
    form.reset();
    hideLoader();
  }
});

const onLoadMoreButtonClick = async () => {
  showLoader();
  hideLoadMoreButton();
  try {
    currentPage += 1;
    const { data } = await getImagesByQuery(currentQuery, currentPage);
    const shown = currentPage * PER_PAGE;
    if (shown < data.totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    }

    gallery.insertAdjacentHTML('beforeend', createGallery(data.hits));
    lightbox.refresh();
    smoothScrollAfterAppend();
  } catch (error) {
    iziToast.error({
      message: `${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

LoadMoreButton.addEventListener('click', onLoadMoreButtonClick);
