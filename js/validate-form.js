import {sendData} from './fetch.js';
import {sendDataSuccess, sendDataError} from './allert-message.js';


const NUMBER_TAGS = 5;
const TEXTAREA_SYMBOLS = 140;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const photoEditorForm = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const textAreaInput = document.querySelector('.text__description');
const buttonSubmit = document.querySelector('#upload-submit');
const validHashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const getHashtagArray = (value) => value.split(' ');

const pristine = new Pristine(photoEditorForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});


// - Правило: сравниваем введенные в строку теги с валидным значением
const checksHashTagSpelling = (value) => {
  // - создаем массив тегов введенных пользователем
  const hashtagArray = getHashtagArray(value).filter((hashTag) => hashTag.length >= 1);
  // - Если поле input пустой или созданный массив тегов проходит валидацию вернется true иначе tag invalid
  return value === '' || hashtagArray.every((tag) => validHashtag.test(tag));
};

// - Правило: не больше определенного числа hashtag
const checkHastTagQuantity = (value) => {
  const hashtagArray = getHashtagArray(value).filter((hashTag) => hashTag.length >= 1);

  return hashtagArray.length <= NUMBER_TAGS;
};

// - Правило: хэштеги не могут повторятся
const checksDuplicatesHashTag = (value) => {
  const hashtagArray = getHashtagArray(value).filter((hashTag) => hashTag.length >= 1).map((arrayElement) => arrayElement.toLowerCase());

  const duplicates = hashtagArray.filter((tag, index, tags) => tags.indexOf(tag) !== index);

  return duplicates.length === 0;
};

// - длина комментария не может быть больше 140 символов
const checkTextareaLength = (value) => value.length <= TEXTAREA_SYMBOLS;

// - Добавляем новые правила для валидации
pristine.addValidator(hashtagsInput, checksHashTagSpelling, 'введён невалидный хэштег', 3, true);
pristine.addValidator(hashtagsInput, checkHastTagQuantity, 'превышено количество хэштегов', 1, true);
pristine.addValidator(hashtagsInput, checksDuplicatesHashTag, 'хэштеги не могут повторятся', 2, true);
pristine.addValidator(textAreaInput, checkTextareaLength, 'длина комментария не может быть больше 140 символов');

const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = SubmitButtonText.IDLE;
};

const addValidatingInputs = (onSuccess) => {
  photoEditorForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(sendDataSuccess)
        .catch(() => sendDataError())
        .finally(unblockSubmitButton);
    }
  });
};

const resetValidation = () => {
  pristine.reset();
};

export {addValidatingInputs, resetValidation};
