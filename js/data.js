import { createPictureList } from './utils/create-picture-descriptions-small.js';
import { createPictureDescriptions, USER_PICTURE_DESCRIPTIONS } from './utils/create-picture-descriptions.js';
import { showBigPicture } from './utils/show-big-picture.js';

createPictureList(createPictureDescriptions(USER_PICTURE_DESCRIPTIONS));

showBigPicture(createPictureDescriptions(USER_PICTURE_DESCRIPTIONS));
