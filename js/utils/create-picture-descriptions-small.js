import {createPictureDescriptions, USER_PICTURE_DESCRIPTIONS} from './create-picture-descriptions.js';

const similarPicturesTemplate = document.querySelector('#picture').content;
const similarListElement = document.querySelector('.pictures');

const similarPictures = createPictureDescriptions(USER_PICTURE_DESCRIPTIONS);

const similarListFragment = document.createDocumentFragment();

const createPictureList = () => {
  similarPictures.forEach(({url, likes, comments}) => {
    const pictureElement = similarPicturesTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments;
    similarListFragment.appendChild(pictureElement);
  });

  similarListElement.appendChild(similarListFragment);
};

export {createPictureList};
/*
const createPictureList = () => {
  const randomUserPictureListElement = document.querySelector('.pictures');
  const randomUserPictureTemplate = document.querySelector('#picture').content;

  const randomUserPictures = createPhotoDescriptions(USER_PHOTO_DESCRIPTIONS);

  const randomUserPictureListFragment = document.createDocumentFragment();

  randomUserPictures.forEach(({url, likes, comments}) => {
    const randomUserPictureElement = randomUserPictureTemplate.cloneNode(true);
    randomUserPictureElement.querySelector('.picture__img').src = url;
    randomUserPictureElement.querySelector('.picture__likes').textContent = likes;
    randomUserPictureElement.querySelector('.picture__comments').textContent = comments;
    randomUserPictureListFragment.appendChild(randomUserPictureElement);
  });

  return randomUserPictureListElement.appendChild(randomUserPictureListFragment);
};

export {createPictureList};
*/
