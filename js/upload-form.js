import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './modal-message.js';
import { openUploadModal, closeUploadModal } from './user-modals.js';

const uploadFileButton = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview img');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadBtnCancel = document.querySelector('.img-upload__cancel');

uploadFileButton.addEventListener('change', () => {
  const reader = new FileReader();
  reader.readAsDataURL(uploadFileButton.files[0]);

  reader.onload = () => {
    imgPreview.src = reader.result;

    openUploadModal();

    imgUploadBtnCancel.addEventListener('click', closeUploadModal);
  };
}, false);


const setUserFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    sendData(
      showSuccessMessage,
      showErrorMessage,
      new FormData(evt.target),
    );
  });
};

export { setUserFormSubmit};
