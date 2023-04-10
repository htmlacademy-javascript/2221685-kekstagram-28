import { isEscapeKey } from './util.js';

const picsSection = document.querySelector('.pictures');

const errorMessageDiv = document.createElement('div');
const bodyElement = document.querySelector('body');

const showErrorMsg = () => {
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
  showErrorMsg();
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

const successLoaingMsg = () => {
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

  const onEscSuccessMsgElement = (evt) => {
    if (isEscapeKey(evt)) {
      successMsgElement.remove();
      document.removeEventListener('keydown', onEscSuccessMsgElement);
    }
  };
  document.addEventListener('keydown', onEscSuccessMsgElement);
};

const loadingErrorMsg = () => {
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

  const onEscErrorMsgElement = (evt) => {
    if (isEscapeKey(evt)) {
      errorMsgElement.remove();
      document.removeEventListener('keydown', onEscErrorMsgElement);
    }
  };

  document.addEventListener('keydown', onEscErrorMsgElement);
};

export {getData, postData, successLoaingMsg, loadingErrorMsg};
