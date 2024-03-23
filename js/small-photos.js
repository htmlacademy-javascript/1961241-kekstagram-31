

const variousListPhoto = document.querySelector('.pictures');
const variousPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');


const addPhotos = (photos) => {
  const variousListFragment = document.createDocumentFragment();

  photos.forEach(({url, description, likes, comments}) => {
    const photoElement = variousPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments;
    variousListPhoto.append(photoElement);
  });
  variousListPhoto.appendChild(variousListFragment);
};

export {addPhotos};
