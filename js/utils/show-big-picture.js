import { isEscEvent } from './utils.js';

const showBigPicture = (imgArray) => {
  document.querySelector('.pictures').addEventListener('click', (e) => {
    const dataClickImage = e.target.getAttribute('data-image');
    document.querySelector('.big-picture').classList.remove('hidden');
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
    document.body.classList.add('modal-open');

    for(const item in imgArray) {
      if(dataClickImage == imgArray[item].id) {
        document.querySelector('.big-picture__img > img').src = imgArray[item].url;
        document.querySelector('.likes-count').textContent = imgArray[item].likes;
        document.querySelector('.comments-count').textContent = imgArray[item].comments.length;
        document.querySelector('.social__caption').textContent = imgArray[item].description;
        const commentsList = document.querySelectorAll('.social__comments > li');
        for (let i = 0; i < commentsList.length; i++) {
          commentsList[i].querySelector('.social__picture').src = imgArray[item].comments[i].avatar;
          commentsList[i].querySelector('.social__picture').alt = imgArray[item].comments[i].name;
          commentsList[i].querySelector('p').textContent = imgArray[item].comments[i].message;
        }
      }

    }

  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      document.querySelector('.big-picture').classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });

  document.querySelector('.big-picture__cancel').addEventListener('click', () => {
    document.querySelector('.big-picture').classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

};


export {showBigPicture};
