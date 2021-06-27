const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const getRandomArrayElement = (elements) => {
  const result = Math.floor(Math.random() * elements.length);
  return elements[result];
};

export {isEscEvent, getRandomArrayElement};


