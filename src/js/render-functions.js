import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const loadMoreButton = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

export const createGallery = images => {
  const dataImage = images.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
      id,
    }) => {
      return `<li class="photo-card " id="${id}" >
      <a href="${largeImageURL}">
        <img src="${webformatURL}" width="360" height="200" alt="${tags}" loading="lazy" />
        <div class="info">
          <div class="info-item">
            <h2>Likes</h2>
            <p>${likes}</p>
          </div>
          <div class="info-item">
            <h2>Views</h2>
            <p>${views}</p>
          </div>
          <div class="info-item">
            <h2>Comments</h2>
            <p>${comments}</p>
          </div>          
          <div class="info-item">
            <h2>Downloads</h2>
            <p>${downloads}</p>
          </div>
        </div>
      </a>
    </li>`;
    }
  );

  return dataImage.join('');
};

export const clearGallery = () => {
  if (gallery) gallery.innerHTML = '';
};

export const showLoader = () => {
  if (loader) loader.classList.remove('is-hidden');
};

export const hideLoader = () => {
  if (loader) loader.classList.add('is-hidden');
};

export const showLoadMoreButton = () => {
  if (loadMoreButton) loadMoreButton.classList.remove('is-hidden');
};

export const hideLoadMoreButton = () => {
  if (loadMoreButton) loadMoreButton.classList.add('is-hidden');
};

export const smoothScrollAfterAppend = () => {
  const firstCard = document.querySelector('.gallery .photo-card');
  if (!firstCard) return;
  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    left: 0,
    behavior: 'smooth',
  });
};
