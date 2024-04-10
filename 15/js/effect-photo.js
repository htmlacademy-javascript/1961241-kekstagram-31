const filterList = {
  none: {
    MIN: 0,
    MAX: 0,
    STEP: 0,
    START: 1,
    FILTER: '',
    UNITS: ''
  },
  chrome: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    START: 1,
    FILTER: 'grayscale',
    UNITS: ''
  },
  sepia: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    START: 1,
    FILTER: 'sepia',
    UNITS: ''
  },
  marvin: {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    START: 100,
    FILTER: 'invert',
    UNITS: '%'
  },
  phobos: {
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    START: 3,
    FILTER: 'blur',
    UNITS: 'px'
  },
  heat: {
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    START: 3,
    FILTER: 'brightness',
    UNITS: ''
  }
};

const sliderElement = document.querySelector('.effect-level__slider');
const sliderParent = document.querySelector('.img-upload__effect-level');
const inputValueSlider = document.querySelector('.effect-level__value');
const uploadPreviewImage = document.querySelector('.img-upload__preview img');
const listFilter = document.querySelector('.effects__list');
const listFilterOriginal = listFilter.querySelector('#effect-none');

/**
 * создает слайдер с использованием библиотеки noUiSlider
 * @param {HTMLElement} sliderElement - HTML-элемент, в котором будет создан слайдер
 */
const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 1,
    step: 1,
    connect: 'lower',
  });
};

/**
 * показывает слайдер, удаляя атрибут disabled и убирая класс hidden
 */
const showSlider = () => {
  sliderElement.removeAttribute('disabled', true);
  sliderParent.classList.remove('hidden');
};

/**
 * скрывает слайдер, устанавливая атрибут disabled и добавляя класс hidden
 */
const hideSlider = () => {
  sliderElement.setAttribute('disabled', true);
  sliderParent.classList.add('hidden');
};

/**
 * очищает стили элементов, сбрасывает фильтр на изображении и сбрасывает значение ползунка ввода
 */
const clearStyle = () => {
  uploadPreviewImage.style.filter = '';
  inputValueSlider.value = '';
};

// - скрываем слайдер т.к. по умолчанию стоит вариант без фильтра.
hideSlider();

let currentSettings = {};

/**
 * обновляет слайдер согласно выбранному фильтру
 */
listFilter.addEventListener('change', (evt) => {
  const currentFilter = filterList[evt.target.value];

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentFilter.MIN,
      max: currentFilter.MAX,
    },
    step: currentFilter.STEP,
    start: currentFilter.START,
  });

  currentSettings = {
    FILTER: currentFilter.FILTER,
    UNITS: currentFilter.UNITS
  };

  showSlider();
  clearStyle();

  if (evt.target.value === 'none') {
    hideSlider();
  }

  uploadPreviewImage.style.filter = `${currentFilter.FILTER}(${currentFilter.MAX}${currentFilter.UNITS})`;
});

const applySlider = () => {
  // cоздаем слайдер.
  createSlider();

  // записываем значение слайдера в Input при изменение значения слайдера
  sliderElement.noUiSlider.on('update', () => {
    // подставляем в input актуальное значение слайдера
    inputValueSlider.value = sliderElement.noUiSlider.get();

    // подставляем актуальные значения для стилей в зависимости от выбранного режима цветокоррекции
    uploadPreviewImage.style.filter = `${currentSettings.FILTER}(${inputValueSlider.value}${currentSettings.UNITS})`;
  });
};

export {applySlider};

const sliderClear = () => {
  listFilterOriginal.checked = true;
  hideSlider();
  uploadPreviewImage.style.filter = '';
};

export {sliderClear};
