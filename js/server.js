import { isEscapeKey } from './util.js';

const picsSection = document.querySelector('.pictures');

const errorMessageDiv = document.createElement('div');
const bodyElement = document.querySelector('body');


const errorMsg = function () {
  errorMessageDiv.classList.add('error-message-server');
  errorMessageDiv.textContent = 'ошибка, данные не загружены';
  errorMessageDiv.style.cssText =
    'grid-column: 1 / 4;color: red;text-align: center;';
  picsSection.appendChild(errorMessageDiv);
};

const getData = (onSuccess) => () => fetch(
  'https://28.javascript.pages.academy/kekstagram/data'
).then((response) => {
  if (response.ok) {
    return response.json();
  }
}).then((data) => {
  onSuccess(data);
}).catch(() => {
  errorMsg();
});


const postData = (evt, onSuccess, onError) => fetch('https://28.javascript.pages.academy/kekstagram',{
  method: 'POST',
  body: new FormData(evt.target),
}).then((response) => {
  if(response.ok) {
    onSuccess();
  } else {
    throw new Error();
  }
}).catch(() => {
  onError();
});

const successLoaingMsg = function () {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMsgElement = successTemplate.cloneNode(true);
  bodyElement.appendChild(successMsgElement);
  const successButton = successMsgElement.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    successMsgElement.remove();
  });

  successMsgElement.addEventListener('click', () => {
    successMsgElement.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      successMsgElement.remove();
    }
  });
};

const errorLoaingMsg = function () {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMsgElement = errorTemplate.cloneNode(true);
  bodyElement.appendChild(errorMsgElement);

  const errorButton = errorMsgElement.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    errorMsgElement.remove();
  });

  errorMsgElement.addEventListener('click', () => {
    errorMsgElement.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      errorMsgElement.remove();
    }
  });
};

export {getData, postData, successLoaingMsg, errorLoaingMsg};
