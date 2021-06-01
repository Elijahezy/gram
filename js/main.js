const MAX_COMMENT = 140;

function getRandomNumber(min,max)  {
  if (max <= min || min < 0) {
    return 'Can not be done';
  }
  const result = Math.floor(Math.random() * (max - min) + min);
  return result;
}
getRandomNumber(15,50);
// Подсказки брал с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getMaxLength = (comment, max) => (comment <= max);

getMaxLength(115, MAX_COMMENT);
