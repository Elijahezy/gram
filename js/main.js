import './api.js';
import './big-img.js';
import './effects-slider.js';
import './scale-control.js';
import './upload-form.js';
import { createPictureList } from './thumbnail.js';
import { showBigPicture } from './big-img.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { setUserFormSubmit, closeUploadModal } from './upload-form.js';


const dataPromise = getData(() => showAlert('Не удалось получить данные с сервера. Попробуйте ещё раз.'));

dataPromise
  .then(createPictureList);

dataPromise.then(showBigPicture);

setUserFormSubmit(closeUploadModal);

