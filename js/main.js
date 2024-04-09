import { generatePhotos } from './data.js';
import { addPhotos } from './small-photos.js';
import { addListeners } from './big-photos.js';
import { applyScale, uploadPhoto } from './upload-form-photo.js';

const variousPhotos = generatePhotos();
addPhotos(variousPhotos);
addListeners(variousPhotos);
uploadPhoto();
applyScale();
