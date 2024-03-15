const AVATARS = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg',
];

const NAMES = [
  'Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Анна',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const Like = {
  MIN: 15,
  MAX: 200,
};

const Comment = {
  MIN: 0,
  MAX: 30,
};

const SIMILAR_PHOTOS_COUNT = 25;

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


/**
 * Генерирует комментарий на основе переданного идентефикатора
 * @param {Number} id идентификатор комментария
 * @returns возвращает объект со свойставми
 */
const generateComment = (id) => {
  return {
    id: id,
    avatar: getRandomArrayElement(AVATARS),
    name: getRandomArrayElement(NAMES),
    message: getRandomArrayElement(MESSAGES),
  }
};


/**
 * Генерирует массив коментариев заданного количества
 * @param {Number} count количество комментариев
 * @returns возвращает массив комментариев
 */
const generateComments = (count) => {
  const comments = [];

  for (let i = 0; i <= count; i++) {
    const comment = generateComment(i);
    comments.push(comment);
  }
  return comments;
};


/**
 * Создаёт массив фотографий
 * @returns возвращает массив фотографий
 */
const generatePhotos = () => {
  const photos = [];

  const countComments = getRandomInteger(Comment.MIN, Comment.MAX);

  for (let i = 1; i <= SIMILAR_PHOTOS_COUNT; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: 'description',
      likes: getRandomInteger(Like.MIN, Like.MAX),
      comments: generateComments(countComments),
    };
    photos.push(photo);
  }
  return photos;
};

const photosDate = generatePhotos();

console.log(photosDate);
