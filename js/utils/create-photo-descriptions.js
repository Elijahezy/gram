import {getRandomPositiveInteger} from './get-random-positive-integer.js';
import {checkStringLength} from './check-string-length.js';

const MAX_COMMENT_LENGTH = 140;
const USER_PHOTO_DESCRIPTIONS = 25;
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Лёша',
  'Саша',
  'Вася',
];

const getRandomArrayElement = (elements) => {
  const result = Math.floor(Math.random() * elements.length);
  return elements[result];
};

const getRandomComment = () => ({
  id: getRandomPositiveInteger(1,100),
  avatar: `img/avatar-${  getRandomPositiveInteger(1,6)  }.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescriptions = (numberOfDescriptions) => {
  const photoDescriptions = [];

  const createSingleDescription = () => {
    let randomId = getRandomPositiveInteger(1, 25);
    while (photoDescriptions.find((item) => item.id === randomId)) {
      randomId = getRandomPositiveInteger(1, 25);
    }
    return {
      id: randomId,
      url: `photos/${  randomId  }.jpg`,
      description: 'Квадрат Малевича',
      likes: getRandomPositiveInteger(15,200),
      comments: new Array(getRandomPositiveInteger(1,3)).fill(null).map(() => getRandomComment()),
    };
  };

  while (photoDescriptions.length < numberOfDescriptions) {
    photoDescriptions.push(createSingleDescription());
  }

  return photoDescriptions;
};

checkStringLength(115, MAX_COMMENT_LENGTH);

export {createPhotoDescriptions, USER_PHOTO_DESCRIPTIONS};
