import './api.js';
import './big-img.js';
import './effects-slider.js';
import './scale-control.js';
import './upload-form.js';
import './filters.js';
import { showFilters, changeFilters } from './filters.js';
import { createPictureList } from './thumbnail.js';
import { showBigPicture } from './big-img.js';
import { getData } from './api.js';
import { setUserFormSubmit } from './upload-form.js';
import { closeUploadModal } from './user-modals.js';

const dataPromise = getData(() => {});

dataPromise
  .then((data) => {
    createPictureList(data);
    showBigPicture(data);
    showFilters();
    changeFilters(data);
  });

setUserFormSubmit(closeUploadModal);
