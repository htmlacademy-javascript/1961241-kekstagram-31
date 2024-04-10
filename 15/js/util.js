/**
 * генерирует рандомное число из диапозона
 * @param {Number} a минимальное число
 * @param {Number} b максимальное число
 * @returns {Number} возвращает случайное число
 */
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export {getRandomInteger};

/**
 * получение случайного элемента из массива
 * @param {Array} elements массив элементов
 * @returns возвращает элемент массива случайного индекса
 */
// const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const getRandomArrayElement = (elements) => {
  const index = getRandomInteger(0, elements.length - 1);
  return elements[index];
};

export {getRandomArrayElement};

/**
 * проверяет, является ли клавиша события клавиатуры клавишей Escape
 * @param {KeyboardEvent} evt объект события клавиатуры
 * @returns {Boolean} если клавиша Escape, условие вернет true, если нет - false
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

export {isEscapeKey};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {debounce};
