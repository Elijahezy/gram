import { createPictureList } from './thumbnail.js';
import { shuffle, debounce } from './utils.js';

const NUMBER_RANDOM_PICTURES = 10;
const RERENDER_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');
const picturesList = document.querySelector('.pictures');
const filterButtons = imgFilters.querySelectorAll('.img-filters__button');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');

const setFiltersActive = (activeButton) => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
};

const clearPhotos = () => {
  const pictures = picturesList.querySelectorAll('.picture');

  pictures.forEach((picture) => {
    picture.remove();
  });
};

const getDefaultPictures = (pictures) => {
  const defaultPictures = pictures.sort((a, b) => a.id > b.id ? 1 : -1);
  return defaultPictures;
};

const getRandomPictures = (pictures) => {
  const randomPictures = shuffle(pictures).slice(0, NUMBER_RANDOM_PICTURES);
  return randomPictures;
};

const getDiscussedPictures = (pictures) => {
  const discussedPictures = pictures.sort((a, b) => a.comments.length > b.comments.length ? 1 : -1);
  return discussedPictures.reverse();
};

const setFilter = (evt, pictures) => {
  clearPhotos();
  const filterButtonElement = evt.target.closest('.img-filters__button');
  setFiltersActive(filterButtonElement);
  const filterAction = {
    'filter-default': getDefaultPictures,
    'filter-random': getRandomPictures,
    'filter-discussed': getDiscussedPictures,
  }[filterButtonElement.id];
  createPictureList(filterAction(pictures));
};

const setFilterDebounced = debounce(setFilter, RERENDER_DELAY);

const changeFilters = (pictures) => {
  filterDefault.addEventListener('click', (evt) => setFilterDebounced(evt, pictures));
  filterRandom.addEventListener('click', (evt) => setFilterDebounced(evt, pictures));
  filterDiscussed.addEventListener('click', (evt) => setFilterDebounced(evt, pictures));
};

const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

export { showFilters, changeFilters };
