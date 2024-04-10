import {isEscapeKey} from './util.js';

const ERROR_SHOW_TIME = 5000;

const templateDataError = document.querySelector('#data-error').content.querySelector('.data-error');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

const showDataError = () => {
  const templateErrorClone = templateDataError.cloneNode(true);
  document.body.append(templateErrorClone);

  setTimeout(() => {
    templateErrorClone.remove();
  }, ERROR_SHOW_TIME);
};

const showNotification = (template) => {
  const templateClone = template.cloneNode(true);
  const button = templateClone.querySelector('[type=button]');

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      templateClone.remove();
      removeEventListeners();
    }
  };

  const onButtonClick = () => {
    templateClone.remove();
    removeEventListeners();
  };

  const onDocumentClick = (evt) => {
    if (evt.target === templateClone) {
      templateClone.remove();
      removeEventListeners();
    }
  };

  function removeEventListeners () {
    button.removeEventListener('click', onButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  button.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.append(templateClone);
};

const sendDataSuccess = () => {
  showNotification(templateSuccess);
};

const sendDataError = () => {
  showNotification(templateError);
};

export {showDataError, sendDataSuccess, sendDataError};
