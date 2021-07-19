import { onModalMessageHide } from './modal-message.js';

const ALERT_SHOW_TIME = 5000;
const MAX_COMMENT_LENGTH = 140;

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onMessageKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onModalMessageHide();
  }
};

const getRandomArrayElement = (elements) => {
  const result = Math.floor(Math.random() * elements.length);
  return elements[result];
};

const hasDuplicates = (array) => {
  array = array.map((evt) => evt.toLowerCase());
  return (new Set(array)).size !== array.length;
};

const checkStringLength  = (string, length) => string <= length;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '30px 10px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

// Функцию shuffle взял тут
// https://learn.javascript.ru/task/shuffle

const shuffle = (pictures) => {
  for (let i = pictures.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [pictures[i], pictures[j]] = [pictures[j], pictures[i]];
  }
  return pictures;
};

export {isEscEvent, getRandomArrayElement, hasDuplicates, checkStringLength, showAlert, onMessageKeydown, MAX_COMMENT_LENGTH, debounce, shuffle };


