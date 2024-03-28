const variousListPhoto = document.querySelector('.pictures');
const variousPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
 * Добавляет массив фотографий и сортирует случайным образом
 * @param {Array} photos Массив фотографий
 */
const addPhotos = (photos) => {
  const variousListFragment = document.createDocumentFragment();
  photos.sort(() => Math.random() - 0.5);

  photos.forEach(({url, description, likes, comments}) => {
    const photoElement = variousPhotoTemplate.cloneNode(true);
    const imageElement = photoElement.querySelector('img');
    imageElement.src = url;
    imageElement.alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    variousListPhoto.append(photoElement);
  });
  variousListPhoto.append(variousListFragment);
};

export {addPhotos};
