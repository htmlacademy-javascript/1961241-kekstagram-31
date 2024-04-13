import {clearSlider} from './effect-photo.js';
import {isEscapeKey} from './util.js';
import {resetValidation} from './validate-form.js';

const bodyElement = document.querySelector('body');
const imgUpload = document.querySelector('.img-upload');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const imgUploadCancelBtn = document.querySelector('#upload-cancel');

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPreviewImage = document.querySelector('.img-upload__preview img');

const textHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

let currentScale = DEFAULT_SCALE;

/**
 * обработчик события для кнопки уменьшения масштаба
 * если текущий масштаб больше 25%, уменьшает его на 25% и применяет изменения
 */
scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= MIN_SCALE;
    applyScale();
  }
});

/**
 * обработчик события для кнопки увеличения масштаба
 * если текущий масштаб меньше 100%, увеличивает его на 25% и применяет изменения
 */
scaleControlBigger.addEventListener('click', () => {
  if (currentScale < DEFAULT_SCALE) {
    currentScale += MIN_SCALE;
    applyScale();
  }
});

/**
 * пименяет текущий масштаб к изображению и обновляет значение масштаба в поле ввода
 */
function applyScale() {
  const scaleValue = currentScale / DEFAULT_SCALE;
  uploadPreviewImage.style.transform = `scale(${scaleValue})`;
  scaleControlValue.value = `${currentScale}%`;
}

/**
 * обработчик события для выбора файла изображения
 * устанавливает текущий масштаб в 100% и применяет его к изображению
 */
uploadFile.addEventListener('change', () => {
  currentScale = DEFAULT_SCALE;
  applyScale();
});

/**
 * обработчик события для изменения значения поля масштаба
 * Если новое значение находится в диапазоне от 25 до 100, устанавливает текущий масштаб в это значение и применяет его к изображению
 */
scaleControlValue.addEventListener('input', () => {
  const value = parseInt(scaleControlValue.value, 10);
  if (value >= MIN_SCALE && value <= DEFAULT_SCALE) {
    currentScale = value;
    applyScale();
  }
});

const clearPhotoSize = () => {
  currentScale = DEFAULT_SCALE;
  uploadPreviewImage.style.transform = 'scale(1)';
  scaleControlValue.value = '100%';
};

/**
 * обработчик события для кнопки сброса фотографии
 * вызывает функцию закрытия фотографии
 */
const onPhotoResetBtnClick = () => closePhoto();

/**
 * обработчик события нажатия клавиши на документе
 * если нажата клавиша Esc и фокус не находится в поле ввода хэш-тега
 * или поле ввода комментария, закрывает модальное окно фотографии
 * @param {KeyboardEvent} evt - объект события клавиатуры
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (
      document.activeElement !== textHashtag &&
      document.activeElement !== textDescription
    ) {
      evt.preventDefault();
      closePhoto();
    }
  }
};

/**
 * закрывает модальное окно фотографии
 * удаляет класс hidden у элемента модального окна и modal-open у body
 * удаляет обработчики событий для нажатия клавиши и кнопки сброса фотографии
 * очищает значение поля выбора файла
 */
function closePhoto () {
  resetValidation();
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadCancelBtn.removeEventListener('click', onPhotoResetBtnClick);
  uploadFile.value = '';
  textHashtag.value = '';
  textDescription.value = '';
  clearPhotoSize();
  clearSlider();
}

/**
 * обработчик события выбора файла для загрузки фотографии
 * показывает модальное окно для редактирования фотографии
 * добавляет класс modal-open к body и удаляет класс hidden у модального окна
 * устанавливает обработчики событий для кнопки сброса фотографии и нажатия клавиши
 */
function uploadPhoto () {
  uploadFile.addEventListener('change', () => {
    bodyElement.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    imgUploadCancelBtn.addEventListener('click', onPhotoResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
}

export {applyScale, closePhoto, uploadPhoto};
