import { isEscEvent } from './utils.js';
import { MAX_COMMENT_LENGTH } from './create-picture-descriptions.js';

const uploadFileButton = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview > img');
const textHashtagsField = document.querySelector('.text__hashtags');
const textDescriptionField = document.querySelector('.text__description');
const imgUploadBtnCancel = document.querySelector('.img-upload__cancel');


function openPictureModal () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

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

  const hasDuplicates = (array) => {
    array = array.map((evt) => evt.toLowerCase());
    return (new Set(array)).size !== array.length;
  };

  arrayHashtags.find((item) => {

    if (!/^#[A-Za-zА-ЯаЯ0-9]{1,19}$/.test(item)) {
      textHashtagsField.setCustomValidity('Хэштег должен начинаться со знака #, и не может содержать в себе спецсимволы');
    } else if (hasDuplicates(arrayHashtags)) {
      textHashtagsField.setCustomValidity('Нельзя добавлять одинаковые хэштеги');
    } else if (arrayHashtags.length > 5) {
      textHashtagsField.setCustomValidity('Нельзя добавлять больше 5 хэштегов');
    } else {
      textHashtagsField.setCustomValidity('');
    }
    textHashtagsField.reportValidity();
  });
}

function closePictureModal () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgPreview.src = '';
  textHashtagsField.value = '';
  textDescriptionField.textContent = '';

  imgUploadBtnCancel.removeEventListener('click', closePictureModal);
  textDescriptionField.removeEventListener('input', closePictureDescriptionModal);
  textHashtagsField.removeEventListener('input', closePictureHashtagModal);
}

function onPictureCloseClick() {
  closePictureModal();
}
const onPictureEscKeydown = (evt) => {
  if (evt.target.tagName === 'TEXTAREA' || evt.target.tagName === 'Hashtag') {
    return;
  }
  imgPreview.src = '';
  textHashtagsField.value = '';
  textDescriptionField.textContent = '';

  if (isEscEvent(evt)) {
    evt.preventDefault();
    onPictureCloseClick();
    document.removeEventListener('keydown', onPictureEscKeydown);
  }
};


uploadFileButton.addEventListener('change', () => {
  const reader = new FileReader();
  reader.readAsDataURL(uploadFileButton.files[0]);

  reader.onload = () => {
    imgPreview.src = reader.result;

    openPictureModal();
    document.addEventListener('keydown', onPictureEscKeydown);
    textHashtagsField.addEventListener('input', closePictureHashtagModal);

    textDescriptionField.addEventListener('input', closePictureDescriptionModal);

    imgUploadBtnCancel.addEventListener('click', closePictureModal);
  };

}, false);
