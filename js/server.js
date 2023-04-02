const picsSection = document.querySelector('.pictures');

const errorMessageDiv = document.createElement('div');

const errorMsg = function () {
  errorMessageDiv.classList.add('error-message-server');
  errorMessageDiv.textContent = 'ошибка, данные не загружены';
  errorMessageDiv.style.cssText =
    'grid-column: 1 / 4;color: red;text-align: center;';
  picsSection.appendChild(errorMessageDiv);
};

const createLoader = (onSuccess, onError) => () => fetch(
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


export {createLoader};
