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
