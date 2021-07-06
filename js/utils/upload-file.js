import { isEscEvent } from './utils.js';
import { MAX_COMMENT_LENGTH } from './create-picture-descriptions.js';
import { hasDuplicates } from './utils.js';

const uploadFileButton = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview > img');
const textHashtagsField = document.querySelector('.text__hashtags');
const textDescriptionField = document.querySelector('.text__description');
const imgUploadBtnCancel = document.querySelector('.img-upload__cancel');

const ERROE_TEXT_VALIDATE = 'Хэштег должен начинаться со знака #, и не может содержать в себе спецсимволы';
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
      textHashtagsField.setCustomValidity(ERROE_TEXT_VALIDATE);
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

const onPictureEscKeydown = (evt) => {
  if (textHashtagsField === document.activeElement || textDescriptionField === document.activeElement) {
    return;
  }

  if (isEscEvent(evt)) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    uploadFileButton.value = '';
    textDescriptionField.value = '';

    textDescriptionField.removeEventListener('input', closePictureDescriptionModal);
    textHashtagsField.removeEventListener('input', closePictureHashtagModal);
    document.removeEventListener('keydown', onPictureEscKeydown);
  }
};
function openPictureModal () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPictureEscKeydown);
}

function closePictureModal () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadFileButton.value = '';
  textDescriptionField.value = '';

  imgUploadBtnCancel.removeEventListener('click', closePictureModal);
  textDescriptionField.removeEventListener('input', closePictureDescriptionModal);
  textHashtagsField.removeEventListener('input', closePictureHashtagModal);
  document.removeEventListener('keydown', onPictureEscKeydown);
}

uploadFileButton.addEventListener('change', () => {
  const reader = new FileReader();
  reader.readAsDataURL(uploadFileButton.files[0]);

  reader.onload = () => {
    imgPreview.src = reader.result;

    openPictureModal();
    textHashtagsField.addEventListener('input', closePictureHashtagModal);

    textDescriptionField.addEventListener('input', closePictureDescriptionModal);

    imgUploadBtnCancel.addEventListener('click', closePictureModal);
  };

}, false);
