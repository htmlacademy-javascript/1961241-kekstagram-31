// import { generatePhotos } from './data.js';
import { addPhotos } from './small-photos.js';
import { addListeners } from './big-photos.js';
import { applyScale, closePhoto, uploadPhoto } from './upload-form-photo.js';
import { applySlider } from './effect-photo.js';
import { addValidatingInputs } from './validate-form.js';
import { getData } from './fetch.js';
import { showDataError } from './allert-message.js';
import { configFilter } from './filter.js';

// const variousPhotos = generatePhotos();
// addPhotos(variousPhotos);
// addListeners(variousPhotos);
// addPhotos();
addValidatingInputs(closePhoto);
applyScale();
applySlider();


async function bootstrapApp() {
  uploadPhoto();
  try {
    const pictures = await getData();
    addPhotos(pictures);
    addListeners(pictures);
    configFilter(pictures);
  } catch {
    showDataError();
  }
}

bootstrapApp();
