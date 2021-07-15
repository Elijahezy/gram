import { isEscEvent } from './utils.js';
import { MAX_COMMENT_LENGTH } from './utils.js';
import { hasDuplicates } from './utils.js';
import { activateScaleChanger, deactivateScaleChanger, CURRENT_CONTROL_VALUE } from './scale-control.js';
import { onEffects, offEffects } from './effects-slider.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './modal-message.js';

const uploadFileButton = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview img');
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtagsField = document.querySelector('.text__hashtags');
const textDescriptionField = document.querySelector('.text__description');
const imgUploadBtnCancel = document.querySelector('.img-upload__cancel');
const scaleValue = document.querySelector('.scale__control--value');

const ERROR_TEXT_VALIDATE = 'Хэштег должен начинаться со знака #, и не может содержать в себе спецсимволы';
const ERROR_NO_REPEAT = 'Нельзя добавлять одинаковые хэштеги';
const MAX_HASHTAGS_COUNT = 5;
const regExp = /^#[A-Za-zА-ЯаЯ0-9]{1,19}$/;

function closePictureDescriptionModal () {
  const valueLength = textDescriptionField.value.length;
  if (valueLength > MAX_COMMENT_LENGTH) {
    textDescriptionField.setCustomValidity(`Удалите лишние ${  valueLength - MAX_COMMENT_LENGTH } симв.`);
  } else {
    textDescriptionField.setCustomValidity('');
  }
  textDescriptionField.reportValidity();
}

function closePictureHashtagModal () {
  const arrayHashtags = textHashtagsField.value.trim().split(' ').filter((tag) => tag);

  arrayHashtags.find((item) => {
    if (!regExp.test(item)) {
      textHashtagsField.setCustomValidity(ERROR_TEXT_VALIDATE);
      return textHashtagsField.reportValidity();
    } else if (hasDuplicates(arrayHashtags)) {
      textHashtagsField.setCustomValidity(ERROR_NO_REPEAT);
      return textHashtagsField.reportValidity();
    } else if (arrayHashtags.length > 5) {
      textHashtagsField.setCustomValidity(MAX_HASHTAGS_COUNT);
      return textHashtagsField.reportValidity();
    } else {
      textHashtagsField.setCustomValidity('');
    }
    textHashtagsField.reportValidity();
  });
}

const onUploadModalEscKeydown = (evt) => {
  if (textHashtagsField === document.activeElement || textDescriptionField === document.activeElement) {
    return;
  }

  if (isEscEvent(evt)) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    uploadFileButton.value = '';
    textDescriptionField.value = '';

    deactivateScaleChanger();
    offEffects();
    textDescriptionField.removeEventListener('input', closePictureDescriptionModal);
    textHashtagsField.removeEventListener('input', closePictureHashtagModal);
    document.removeEventListener('keydown', onUploadModalEscKeydown);
  }
};
function openUploadModal () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadModalEscKeydown);
  scaleValue.value = `${100  }%`;
  imgPreview.style.transform = `scale(${CURRENT_CONTROL_VALUE})`;

  activateScaleChanger();
  onEffects();
}

function closeUploadModal () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');


  uploadFileButton.value = '';
  textDescriptionField.value = '';
  deactivateScaleChanger();
  offEffects();
  imgUploadBtnCancel.removeEventListener('click', closeUploadModal);
  textDescriptionField.removeEventListener('input', closePictureDescriptionModal);
  textHashtagsField.removeEventListener('input', closePictureHashtagModal);
  document.removeEventListener('keydown', onUploadModalEscKeydown);
}

uploadFileButton.addEventListener('change', () => {
  const reader = new FileReader();
  reader.readAsDataURL(uploadFileButton.files[0]);

  reader.onload = () => {
    imgPreview.src = reader.result;

    openUploadModal();

    textHashtagsField.addEventListener('input', closePictureHashtagModal);

    textDescriptionField.addEventListener('input', closePictureDescriptionModal);

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

export { setUserFormSubmit, closeUploadModal};
