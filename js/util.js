/**
 * Генерирует рандомное число из диапозона
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
 * Получение случайного элемента
 * @param {Number} elements
 * @returns возвращает элемент массива случайного индекса
 */
// const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const getRandomArrayElement = (elements) => {
  const index = getRandomInteger(0, elements.length - 1);
  return elements[index];
};

export {getRandomArrayElement};
