import { isEscEvent } from './utils.js';

const buttonCloseModal = document.querySelector('.big-picture__cancel');

const onPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    document.querySelector('.big-picture').classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.querySelector('.social__comment-count').classList.remove('hidden');
    document.querySelector('.comments-loader').classList.remove('hidden');
  }
};


function openPictureModal () {
  document.querySelector('.big-picture').classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  document.addEventListener('keydown', onPictureEscKeydown);
}

function closePictureModal () {
  document.querySelector('.big-picture').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');

  document.removeEventListener('keydown', onPictureEscKeydown);
  buttonCloseModal.removeEventListener('click', closePictureModal);
}


const showBigPicture = (array) => {
  const bigPictureTemplate = (element) => {
    document.querySelector('.big-picture__img > img').src = element.url;
    document.querySelector('.likes-count').textContent = element.likes;
    document.querySelector('.comments-count').textContent = element.comments.length;
    document.querySelector('.social__caption').textContent = element.description;

    const commentListElements = document.querySelector('.social__comments');
    const commentElements = document.querySelectorAll('.social__comments > li');

    commentElements.forEach((item) => item.remove() );

    for (let i = 0; i < element.comments.length; i++) {
      const li = document.createElement('li');
      li.classList.add('social__comment');

      const img = document.createElement('img');
      img.classList.add('social__picture');
      img.src = element.comments[i].avatar;
      img.alt = element.comments[i].name;
      img.width = 35;
      img.height = 35;
      li.appendChild(img);

      const p = document.createElement('p');
      p.classList.add('social__text');
      p.textContent = element.comments[i].message;
      li.appendChild(p);

      commentListElements.appendChild(li);
    }
  };

  document.querySelector('.pictures').addEventListener('click', (evt) => {
    const dataClickImage = evt.target.getAttribute('data-image');
    const target = evt.target;
    const ignoreTarget = document.querySelector('.img-upload');

    if (target === ignoreTarget || ignoreTarget.contains(target)) {
      return;
    }

    openPictureModal();

    const photo = array[dataClickImage];
    bigPictureTemplate(photo);
    buttonCloseModal.addEventListener('click', closePictureModal);
  });

};

export { showBigPicture };
