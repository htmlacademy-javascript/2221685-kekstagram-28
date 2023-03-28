import { isEscapeKey } from './util.js';
const sectionPictures = document.querySelector('.pictures');
const bodyElement = document.querySelector('body');
const form = sectionPictures.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const imgUpload = form.querySelector('.img-upload__overlay');
const uploadCancelButton = form.querySelector('#upload-cancel');
const commentField = form.querySelector('.text__description');
const textHashtags = form.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text-error',
});

const inputHashtag = document.querySelector('.text__hashtags');

pristine.addValidator(inputHashtag, (value) => {
  if (validateHashtags(value)) {
    console.log('Hashtag test true');
    return true;
  } else {
    console.log('Hashtag test false');
    return false;
  }

}, 'Hashtag is not valid', 2, false);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

function validateHashtags(hashtags) {
  const hashtagsArray = hashtags.trim().split(/\s+/);
  if (hashtagsArray.length > 5) {
    return false;
  }
  const hashtagCounts = {};
  for (let i = 0; i < hashtagsArray.length; i++) {
    const hash = hashtagsArray[i];
    const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
    if (hash.length === 0) {
      return false;
    }
    if (!hashtag.test(hash)) {
      return false;
    }
    if (hashtagCounts[hash] !== undefined) {
      return false;
    }
    hashtagCounts[hash] = 1;
  }
  return true;
}


uploadFile.addEventListener('change', () => {
  imgUpload.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
});

const uploadCancelButtonFunc = function (evt) {
  if (document.activeElement === commentField || document.activeElement === textHashtags) {
    evt.preventDefault();
  } else {
    imgUpload.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  }
};

uploadCancelButton.addEventListener('click', () => {
  uploadCancelButtonFunc();
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    uploadCancelButtonFunc();
  }
});

export {validateHashtags};
