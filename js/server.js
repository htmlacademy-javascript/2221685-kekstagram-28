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

const getData = (onSuccess, onError) => () => fetch(
  'https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
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
  const successTemplate = document.querySelector('#success');
  const successMsgElement = successTemplate.cloneNode(true);
  bodyElement.appendChild(successMsgElement);
};

export {getData, postData, successLoaingMsg};
