import { imgArray } from './utils/create-picture-descriptions.js';
import { createPictureList } from './utils/create-picture-descriptions-small.js';
import { showBigPicture } from './utils/show-big-picture.js';
import { uploadFile } from './utils/upload-file.js';

createPictureList(imgArray);

showBigPicture(imgArray);

uploadFile();
