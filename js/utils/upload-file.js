import { isEscEvent } from './utils.js';
import { MAX_COMMENT_LENGTH } from './create-picture-descriptions.js';

const uploadFile = () => {
  const form = document.querySelector('.img-upload__form');
  const uploadFileButton = document.querySelector('#upload-file');
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');
  const imgPreview = document.querySelector('.img-upload__preview > img');
  const textHashtags = document.querySelector('.text__hashtags');
  const textDescription = document.querySelector('.text__description');

  form.method = 'post';
  form.action = 'https://23.javascript.pages.academy/kekstagram';


  const onPictureEscKeydown = (evt) => {
    if (evt.target.tagName === 'TEXTAREA' || evt.target.tagName === 'INPUT') {
      return;
    }

    if (isEscEvent(evt)) {
      evt.preventDefault();
      imgUploadOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      imgPreview.src = '/';
      textHashtags.value = '';
      textDescription.textContent = '';
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
    imgPreview.src = '';
    textHashtags.value = '';
    textDescription.textContent = '';

    document.removeEventListener('keydown', onPictureEscKeydown);
  }


  uploadFileButton.addEventListener('change', () => {
    const reader = new FileReader();
    reader.readAsDataURL(uploadFileButton.files[0]);

    reader.onload = () => {
      imgPreview.src = reader.result;

      openPictureModal();

      textHashtags.addEventListener('input', () => {
        const value = textHashtags.value;
        const comma = ' ';

        function splitString(stringToSplit, separator) {
          const arrayOfStrings = stringToSplit.split(separator);
          return arrayOfStrings;
        }

        const arrayHashtags = splitString(value, comma);

        arrayHashtags.forEach((item) => {
          function hasDuplicates(array) {
            array = array.map((evt) => evt.toLowerCase());
            return (new Set(array)).size !== array.length;
          }

          if (!/^#[A-Za-zА-ЯаЯ0-9]{1,19}$/.test(item)) {
            textHashtags.setCustomValidity('Хэштег должен начинаться со знака #, и не может содержать в себе спецсимволы');
          } else if (hasDuplicates(arrayHashtags)) {
            textHashtags.setCustomValidity('Нельзя добавлять одинаковые хэштеги');
          } else if (arrayHashtags.length > 5) {
            textHashtags.setCustomValidity('Нельзя добавлять больше 5 хэштегов');
          } else {
            textHashtags.setCustomValidity('');
          }
        });
      });

      textDescription.addEventListener('input', () => {
        const valueLength = textDescription.value.length;
        if (valueLength > MAX_COMMENT_LENGTH) {
          textDescription.setCustomValidity(`Удалите лишние ${  valueLength - MAX_COMMENT_LENGTH } симв.`);
        } else {
          textDescription.setCustomValidity('');
        }
      });

      const imgUploadCancel = document.querySelector('.img-upload__cancel');
      imgUploadCancel.addEventListener('click', closePictureModal);


    };

  }, false);
};

export { uploadFile };
