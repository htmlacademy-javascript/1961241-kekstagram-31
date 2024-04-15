import {addPhotos} from './small-photos.js';
import {debounce} from './util.js';
import {addListeners} from './big-photos.js';

const filterElement = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const MAX_PICTURE_COUNT = 10;

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const SORTFUNC = {
  getRandomNum: () => 0.5 - Math.random(),
  getDiscussedNum: (a, b) => b.comments.length - a.comments.length,
};

let pictures = [];

const applyFilter = (currentFilter) => {
  let filteredPictures = [];
  switch (currentFilter) {
    case FILTER.default:
      filteredPictures = pictures;
      break;
    case FILTER.random:
      filteredPictures = pictures.slice().sort(SORTFUNC.getRandomNum).slice(0, MAX_PICTURE_COUNT);
      break;
    case FILTER.discussed:
      filteredPictures = pictures.slice().sort(SORTFUNC.getDiscussedNum);
      break;
    default:
      filteredPictures = pictures;
  }
  addPhotos(filteredPictures);
  addListeners(filteredPictures);
};

const onFilterChange = (evt) => {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')) {
    return;
  }

  if (activeButton === targetButton) {
    return;
  }

  if (activeButton) {
    activeButton.classList.remove(ACTIVE_BUTTON_CLASS);
  }

  targetButton.classList.add(ACTIVE_BUTTON_CLASS);
  const currentFilter = targetButton.getAttribute('id');

  applyFilter(currentFilter);
};

const configFilter = (picturesData) => {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', debounce(onFilterChange));
  pictures = picturesData;
};

export { configFilter };
