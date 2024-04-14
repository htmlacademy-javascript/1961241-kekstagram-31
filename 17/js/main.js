import {addPhotos} from './small-photos.js';
import {addListeners} from './big-photos.js';
import {applyScale, closePhoto, uploadPhoto} from './upload-form-photo.js';
import {applySlider} from './effect-photo.js';
import {addValidatingInputs} from './validate-form.js';
import {getData} from './fetch.js';
import {showDataError} from './allert-message.js';
import {configFilter} from './filter.js';

addValidatingInputs(closePhoto);
applyScale();
applySlider();
uploadPhoto();

async function bootstrapApp() {

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
