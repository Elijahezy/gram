const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const getRandomArrayElement = (elements) => {
  const result = Math.floor(Math.random() * elements.length);
  return elements[result];
};

const hasDuplicates = (array) => {
  array = array.map((evt) => evt.toLowerCase());
  return (new Set(array)).size !== array.length;
};


export {isEscEvent, getRandomArrayElement, hasDuplicates};


