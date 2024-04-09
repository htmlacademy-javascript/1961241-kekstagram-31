import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');
const imgUpload = document.querySelector('.img-upload');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const imgUploadCancelBtn = document.querySelector('#upload-cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const MAX_HASHTAGS = 5;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPreviewImage = document.querySelector('.img-upload__preview img');

let currentScale = 100;

scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > 25) {
    currentScale -= 25;
    applyScale();
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentScale < 100) {
    currentScale += 25;
    applyScale();
  }
});

function applyScale() {
  const scaleValue = currentScale / 100;
  uploadPreviewImage.style.transform = `scale(${scaleValue})`;
  scaleControlValue.value = `${currentScale}%`;
}

uploadFile.addEventListener('change', () => {
  currentScale = 100;
  applyScale();
});

scaleControlValue.addEventListener('input', () => {
  const value = parseInt(scaleControlValue.value, 10);
  if (value >= 25 && value <= 100) {
    currentScale = value;
    applyScale();
  }
});

export {applyScale};

const onPhotoResetBtnClick = () => closePhoto();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
};

function closePhoto () {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadCancelBtn.removeEventListener('click', onPhotoResetBtnClick);
  uploadFile.value = '';
}

export function uploadPhoto () {
  uploadFile.addEventListener('change', () => {
    bodyElement.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    imgUploadCancelBtn.addEventListener('click', onPhotoResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
}

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});
pristine.addValidator(hashtagInput, (value) => {
  if (!value) {
    return true;
  }
  const hashtags = value.toLowerCase().split(' ');
  for (const hashtag of hashtags) {
    if (!/^#[a-zа-яё0-9]+$/i.test(hashtag)) {
      return;
    }
  }
  for (const hashtag of hashtags) {
    if (hashtag.length > 20) {
      return;
    }
  }
  if (hashtags.length > MAX_HASHTAGS) {
    return `Нельзя указать больше ${ MAX_HASHTAGS } хэштегов`;
  }
  return true;
});

pristine.addValidator(commentInput, (value) => {
  if (!value) {
    return true;
  }

  if (value.length > 140) {
    return 'Длина комментария не может превышать 140 символов';
  }
  return true;
});

commentInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});
