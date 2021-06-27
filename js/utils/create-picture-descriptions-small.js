const similarPicturesTemplate = document.querySelector('#picture').content;
const similarPicturesList = document.querySelector('.pictures');

const similarFragmentsList = document.createDocumentFragment();

const createPictureList = (similarElements) => {
  similarElements.forEach(({url, likes, comments, id}) => {
    const pictureElement = similarPicturesTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__img').setAttribute('data-image', id);
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    similarFragmentsList.appendChild(pictureElement);
  });

  similarPicturesList.appendChild(similarFragmentsList);
};

export {createPictureList};
