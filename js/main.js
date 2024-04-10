// import { generatePhotos } from './data.js';
import { addPhotos } from './small-photos.js';
import { addListeners } from './big-photos.js';
import { applyScale, closePhoto, uploadPhoto } from './upload-form-photo.js';
import { applySlider } from './effect-photo.js';
import {addValidatingInputs} from './validate-form.js';
import { getData } from './fetch.js';
import { showDataError } from './allert-message.js';

// const variousPhotos = generatePhotos();
// addPhotos(variousPhotos);
// addListeners(variousPhotos);
uploadPhoto();
addValidatingInputs(closePhoto);
applyScale();
applySlider();


const bootstrap = async () => {
  try {
    const photos = await getData();
    addPhotos(photos);
    addListeners(photos);
  } catch (error) {
    showDataError(error.message);
  }
};

bootstrap();
