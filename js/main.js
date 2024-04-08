import { generatePhotos } from './data.js';
import { addPhotos } from './small-photos.js';
import { addListeners } from './big-photos.js';
import { uploadPhoto } from './upload-form-photo.js';

const variousPhotos = generatePhotos();
addPhotos(variousPhotos);
addListeners(variousPhotos);
uploadPhoto();
