import { sliderClear } from './effect-photo.js';
import { isEscapeKey } from './util.js';
import { resetValidation } from './validate-form.js';

const bodyElement = document.querySelector('body');
const imgUpload = document.querySelector('.img-upload');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const imgUploadCancelBtn = document.querySelector('#upload-cancel');

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPreviewImage = document.querySelector('.img-upload__preview img');

let currentScale = 100;

/**
 * обработчик события для кнопки уменьшения масштаба
 * если текущий масштаб больше 25%, уменьшает его на 25% и применяет изменения
 */
scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > 25) {
    currentScale -= 25;
    applyScale();
  }
});

/**
 * обработчик события для кнопки увеличения масштаба
 * если текущий масштаб меньше 100%, увеличивает его на 25% и применяет изменения
 */
scaleControlBigger.addEventListener('click', () => {
  if (currentScale < 100) {
    currentScale += 25;
    applyScale();
  }
});

/**
 * пименяет текущий масштаб к изображению и обновляет значение масштаба в поле ввода
 */
function applyScale() {
  const scaleValue = currentScale / 100;
  uploadPreviewImage.style.transform = `scale(${scaleValue})`;
  scaleControlValue.value = `${currentScale}%`;
}

/**
 * обработчик события для выбора файла изображения
 * устанавливает текущий масштаб в 100% и применяет его к изображению
 */
uploadFile.addEventListener('change', () => {
  currentScale = 100;
  applyScale();
});

/**
 * обработчик события для изменения значения поля масштаба
 * Если новое значение находится в диапазоне от 25 до 100, устанавливает текущий масштаб в это значение и применяет его к изображению
 */
scaleControlValue.addEventListener('input', () => {
  const value = parseInt(scaleControlValue.value, 10);
  if (value >= 25 && value <= 100) {
    currentScale = value;
    applyScale();
  }
});

export {applyScale};

const clearPhotoSize = () => {
  currentScale = 100;
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
 * если нажата клавиша Esc, вызывает функцию закрытия фотографии
 * @param {KeyboardEvent} evt - Объект события клавиатуры
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
};

/**
 * закрывает модальное окно фотографии
 * удаляет класс hidden у элемента модального окна и modal-open у body
 * удаляет обработчики событий для нажатия клавиши и кнопки сброса фотографии
 * очищает значение поля выбора файла
 */
export function closePhoto () {
  resetValidation();
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadCancelBtn.removeEventListener('click', onPhotoResetBtnClick);
  uploadFile.value = '';
  clearPhotoSize();
  sliderClear();
}

/**
 * обработчик события выбора файла для загрузки фотографии
 * показывает модальное окно для редактирования фотографии
 * добавляет класс modal-open к body и удаляет класс hidden у модального окна
 * устанавливает обработчики событий для кнопки сброса фотографии и нажатия клавиши
 */
export function uploadPhoto () {
  uploadFile.addEventListener('change', () => {
    bodyElement.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    imgUploadCancelBtn.addEventListener('click', onPhotoResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
}


