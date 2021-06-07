/* eslint-disable arrow-body-style */
/* eslint-disable prefer-template */
/* eslint-disable id-length */
const MAX_COMMENT_LENGTH = 140;
const USER_PHOTO_DESCRIPTIONS = 25;

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getCommentMaxLength = (comment, max) => (comment <= max);
getCommentMaxLength(115, MAX_COMMENT_LENGTH);

const getRandomArrayElement = (elements) => {
  const result = Math.floor(Math.random() * elements.length);
  return elements[result];
};

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Артём',
  'Лёша',
  'Саша',
  'Вася',
];

const getRandomComment = () => {
  return {
    id: getRandomPositiveInteger(1,100),
    avatar: 'img/avatar-' + getRandomPositiveInteger(1,6) + '.svg',
    message: getRandomArrayElement(comments),
    name: getRandomArrayElement(names),
  };
};

const createPhotoDescription = () => {
  return {
    id: 0,
    url: '',
    description: 'Квадрат Малевича',
    likes: getRandomPositiveInteger(15,200),
    comments: new Array(getRandomPositiveInteger(1,3)).fill(null).map(() => getRandomComment()),
  };
};

const photoDescriptions = new Array(USER_PHOTO_DESCRIPTIONS).fill(null).map(() => createPhotoDescription());
photoDescriptions.forEach((n, i) => n.id = i + 1); // Даёт каждому id уникальный номер
photoDescriptions.forEach((n, i) => n.url = 'photos/' + (i + 1) + '.jpg'); // Даёт каждому url уникальный номер
