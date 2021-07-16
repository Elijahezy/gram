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

export {isEscEvent, getRandomArrayElement, hasDuplicates, checkStringLength, showAlert, onMessageKeydown, MAX_COMMENT_LENGTH };


