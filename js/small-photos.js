const variousListPhoto = document.querySelector('.pictures');
const variousPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
 * Добавляет массив фотографий
 * @param {Array} photos Массив фотографий
 */
const addPhotos = (photos) => {
  const variousListFragment = document.createDocumentFragment();

  photos.forEach(({url, description, likes, comments}) => {
    const photoElement = variousPhotoTemplate.cloneNode(true);
    const imageElement = document.querySelector('.picture__img');
    imageElement.src = url;
    imageElement.alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments;
    variousListPhoto.append(photoElement);
  });
  variousListPhoto.appendChild(variousListFragment);
};

export {addPhotos};
