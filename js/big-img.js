import { openPictureModal, onClosePictureModal } from './user-modals.js';

const AVATAR_SIZE = 35;
const COMMENTS_STEP = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img > img');
const socialDescription = bigPicture.querySelector('.social__caption');
const socialLikes = bigPicture.querySelector('.likes-count');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const pictureCloseElement = document.querySelector('.big-picture__cancel');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const uploadButtonToIgnore = document.querySelector('.img-upload');

let currentComments = [];

const showComment = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  const commentPicture = document.createElement('img');
  const commentText = document.createElement('p');

  commentElement.classList.add('social__comment');
  commentPicture.classList.add('social__picture');
  commentText.classList.add('social__text');
  commentPicture.src = avatar;
  commentPicture.alt = name;
  commentPicture.width = AVATAR_SIZE;
  commentPicture.height = AVATAR_SIZE;
  commentText.textContent = message;

  commentElement.appendChild(commentPicture);
  commentElement.appendChild(commentText);
  commentsList.appendChild(commentElement);
};

const showComments = (comments) => comments.forEach(showComment);
const onShowMoreComments = () => {
  const displayedCommentsCount = commentsList.querySelectorAll('.social__comment').length;
  showComments(currentComments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_STEP));
  const numberComments = commentsList.querySelectorAll('.social__comment').length;
  if (numberComments === currentComments.length) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
  socialCommentCount.textContent = `${numberComments} из ${currentComments.length} комментариев`;
};

const showBigPicture = (array) => {

  const bigPictureTemplate = (element) => {
    bigPictureImg.src = element.url;
    socialLikes.textContent = element.likes;
    commentsCount.textContent = element.comments.length;
    socialDescription.textContent = element.description;
    commentsList.innerHTML = '';
    currentComments = element.comments;
    onShowMoreComments(element.comments);
  };

  document.querySelector('.pictures').addEventListener('click', (evt) => {
    const dataClickImage = evt.target.getAttribute('data-image');
    const target = evt.target;
    const photo = array[dataClickImage];

    if (target === uploadButtonToIgnore || uploadButtonToIgnore.contains(target)) {
      return;
    }

    openPictureModal();
    bigPictureTemplate(photo);
    pictureCloseElement.addEventListener('click', onClosePictureModal);
  });
};

export { showBigPicture, onShowMoreComments };
