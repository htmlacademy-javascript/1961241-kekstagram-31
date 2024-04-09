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
function closePhoto () {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadCancelBtn.removeEventListener('click', onPhotoResetBtnClick);
  uploadFile.value = '';
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
