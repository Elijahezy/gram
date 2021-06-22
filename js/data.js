import {createPictureList} from './utils/create-picture-descriptions-small.js';
import {createPictureDescriptions, USER_PICTURE_DESCRIPTIONS} from './utils/create-picture-descriptions.js';

createPictureList(createPictureDescriptions(USER_PICTURE_DESCRIPTIONS));
