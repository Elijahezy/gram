import { imgArray } from './utils/create-picture-descriptions.js';
import { createPictureList } from './utils/create-picture-descriptions-small.js';
import { showBigPicture } from './utils/show-big-picture.js';
import './utils/upload-file.js';
import './utils/effects.js';
import '../nouislider/nouislider.js';
import './utils/effects-slider.js';


createPictureList(imgArray);

showBigPicture(imgArray);
