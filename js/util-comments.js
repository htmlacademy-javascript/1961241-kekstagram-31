const STEP = 5;
let count = 0;
let arrayComments = [];
const fullPhotoOpenElement = document.querySelector('.big-picture');
const socialComments = fullPhotoOpenElement.querySelector('.social__comments');
const socialComment = fullPhotoOpenElement.querySelector('.social__comment');
const commentShownCount = fullPhotoOpenElement.querySelector('.social__comment-shown-count');
const commentTotalCount = fullPhotoOpenElement.querySelector('.social__comment-total-count');
const buttonCommentsLoader = fullPhotoOpenElement.querySelector('.comments-loader');
socialComments.innerHTML = '';

/**
 * Открывает следующие комментарии для отображения
 * @param {number} count - текущий индекс комментария
 * @param {number} STEP - количество комментариев для отображения
 * @param {Array} arrayComments - массив комментариев
 * @param {HTMLElement} socialComment - элемент шаблона комментария
 * @param {HTMLElement} socialComments - контейнер для комментариев
 * @param {HTMLElement} commentShownCount - элемент для отображения количества показанных комментариев
 * @param {HTMLElement} commentTotalCount - элемент для отображения общего количества комментариев
 * @param {HTMLElement} buttonCommentsLoader - кнопка для загрузки дополнительных комментариев
 */
const openNextComments = () => {
  // Выбирает следующие комментарии для отображения
  const openedComments = arrayComments.slice(count, count + STEP);
  // Вычисляет общее количество отображенных комментариев
  const openedCommentsLength = openedComments.length + count;

  /**
 * Отображает комментарии в контейнере socialComments
 * @param {Array} openedComments - массив открываемых комментариев
 * @param {HTMLElement} socialComment - элемент шаблона комментария
 * @param {HTMLElement} socialComments - контейнер для отображения комментариев
 */
  openedComments.forEach((comment) => {
    // Создает копию элемента шаблона комментария
    const socialCommentCloneItem = socialComment.cloneNode(true);
    // Находит элемент изображения в комментарии и устанавливает для него src и alt
    const socialPicture = socialCommentCloneItem.querySelector('.social__picture');
    socialPicture.src = comment.avatar;
    socialPicture.alt = comment.name;
    // Устанавливает текст комментария
    socialCommentCloneItem.querySelector('.social__text').textContent = comment.message;
    // Добавляет скопированный комментарий в контейнер для отображения комментариев
    socialComments.append(socialCommentCloneItem);
  });

  commentShownCount.textContent = openedCommentsLength;
  commentTotalCount.textContent = arrayComments.length;

  if(openedCommentsLength >= arrayComments.length) {
    buttonCommentsLoader.classList.add('hidden');
  }

  count += STEP;
};

/**
 * Открывает комментарии для отображения и устанавливает обработчик события на кнопку загрузки дополнительных комментариев
 * @param {Array} comments - массив комментариев
 */
const openComments = (comments) => {
  arrayComments = comments;
  openNextComments();
  buttonCommentsLoader.addEventListener('click', (evt) => {
    evt.preventDefault();
    openNextComments();
  });
};

/**
 * Закрывает комментарии, сбрасывает состояние и удаляет обработчик события на кнопке загрузки
 */
const closeComments = () => {
  buttonCommentsLoader.classList.remove('hidden');
  count = 0;
  socialComments.innerHTML = '';
  buttonCommentsLoader.removeEventListener('click', () => {
    openNextComments();
  });
};

export {openComments, closeComments};
