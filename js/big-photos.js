import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');
const overlayElement = document.querySelector('.overlay');
const fullPhotoOpenElement = document.querySelector('.big-picture');
const fullPhotoCloseElement = document.querySelector('.big-picture__cancel');
const socialComments = fullPhotoOpenElement.querySelector('.social__comments');
const socialComment = fullPhotoOpenElement.querySelector('.social__comment');
const socialCommentCount = fullPhotoOpenElement.querySelector('.social__comment-count');
const loadComments = fullPhotoOpenElement.querySelector('.comments-loader');

/**
 * обработчик события нажатия клавиши на фотографии
 * если нажата клавиша Escape, закрывает полноэкранное отображение фотографии
 * @param {KeyboardEvent} evt событие нажатия клавиши
 */
const onPhotoKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

/**
 * заполняет раздел комментариев в социальной сети переданными комментариями к фотографии
 * @param {Array} photoComments массив комментариев к фотографии
 */
const fillComments = (photoComments) => {
  socialComments.innerHTML = '';


  photoComments.forEach(({avatar, name, message}) => {
    const newComment = socialComment.cloneNode(true);
    const picture = newComment.querySelector('.social__picture');
    picture.src = avatar;
    picture.alt = name;
    newComment.querySelector('.social__text').textContent = message;
    socialComments.append(newComment);
  });
};

/**
 * открывает большое фото и заполняет комментариями
 * @param {String} url ссылка
 * @param {Number} likes количество лайков
 * @param {String} description описание фото
 */
function openFullPhoto ({url, likes, description, comments}) {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  loadComments.classList.add('hidden');
  fullPhotoOpenElement.querySelector('img').src = url;
  fullPhotoOpenElement.querySelector('.likes-count').textContent = likes;
  fullPhotoOpenElement.querySelector('.social__caption').textContent = description;
  document.addEventListener('keydown', onPhotoKeydown);
  fillComments(comments);
}

/**
 * закрывает большое фото
 */
function closeFullPhoto () {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoKeydown);
}

fullPhotoOpenElement.addEventListener('click', () => {
  openFullPhoto();
});

fullPhotoCloseElement.addEventListener('click', () => {
  closeFullPhoto();
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    overlayElement.classList.add('hidden');
  }
});

/**
 * добавляет обработчик клика по фото
 * @param {Array} photos массив фотографий
 * @param {Object} photo объект с данными фотографии
 */
const addPhotosClickHandler = (photos, photo) => {
  photos.addEventListener('click', () => {
    openFullPhoto(photo);
    document.addEventListener('keydown', onPhotoKeydown);
  });
};

/**
 * связывает данные из массива
 * @param {Array} photos массив фотографий
 */
const addListeners = (photos) => {
  const photoElements = document.querySelectorAll('.picture');

  for (let i = 0; i < photoElements.length; i++) {
    addPhotosClickHandler(photoElements[i], photos[i]);
  }
};

export {addListeners};
