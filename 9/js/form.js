import { isEscapeKey } from './util.js';

const sectionPictures = document.querySelector('.pictures');
const bodyElement = document.querySelector('body');
const form = sectionPictures.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const imgUpload = form.querySelector('.img-upload__overlay');
const uploadCancelButton = form.querySelector('#upload-cancel');
const commentField = form.querySelector('.text__description');
const textHashtags = form.querySelector('.text__hashtags');

const step = 25;
const minValue = 25;
const maxValue = 100;
const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControlValue = form.querySelector('.scale__control--value');

const imgUploadPreview = imgUpload.querySelector('.img-upload__preview');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__text-error',
});

const inputHashtag = document.querySelector('.text__hashtags');

pristine.addValidator(inputHashtag, (value) => validateHashtags(value), 'Hashtag is not valid', 2, false);

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

uploadCancelButton.addEventListener('click', (evt) => {
  uploadCancelButtonFunc(evt);
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    uploadCancelButtonFunc(evt);
  }
});

scaleControlSmaller.addEventListener('click', () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  if (currentValue <= minValue) {
    scaleControlValue.value = minValue;
  }else{
    scaleControlValue.value = currentValue - step;
  }

  imgUploadPreview.style.transform = `scale(${scaleControlValue.value / 100 })`;
  scaleControlValue.value = `${scaleControlValue.value}%`;
});

scaleControlBigger.addEventListener('click', () => {
  // убрать % - преобразовывает строку в число
  const currentValue = parseInt(scaleControlValue.value, 10);
  if(scaleControlBigger, currentValue >= maxValue) {
    scaleControlValue.value = maxValue;
  }else{
    scaleControlValue.value = currentValue + step;
  }
  imgUploadPreview.style.transform = `scale(${scaleControlValue.value / 100 })`;
  scaleControlValue.value = `${scaleControlValue.value}%`;
});

//фильтры

const effectsList = sectionPictures.querySelector('.effects__list');
const imgUploadPpreview = sectionPictures.querySelector('.img-upload__preview');
// const effectDefault = effectsList.querySelector('.effects__preview--none');


const resetFilters = () =>{
  imgUploadPpreview.classList.remove(
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat'
  );
};

const effectSlider = imgUpload.querySelector('.effect-level__slider');
const effectLevelValueInput = imgUpload.querySelector('.effect-level__value');
// if sepia - range от 0-1 step 0,1
const slider = noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
});

const applyFilter = (filterName, value) => {
  switch (filterName) {
    case 'chrome':
      imgUploadPreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      imgUploadPreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      imgUploadPreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      imgUploadPreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      imgUploadPreview.style.filter = `brightness(${value})`;
      break;
    default:
      imgUploadPreview.style.filter = '';
      break;
  }
};

slider.on('update',() => {
  const sliderValue = slider.get();
  effectLevelValueInput.value = sliderValue;
  const filterName = effectsList.querySelector('.effects__radio:checked').value;
  applyFilter(filterName, sliderValue);
});

const effectLevelFieldset = imgUpload.querySelector('.img-upload__effect-level');
effectLevelFieldset.classList.add('hidden');

effectsList.addEventListener('change', (evt) => {
  if (evt.target.matches('.effects__radio')) {
    resetFilters();
    const effect = evt.target.value;
    if (effect === 'none') {
      effectLevelFieldset.classList.add('hidden');
    } else {
      effectLevelFieldset.classList.remove('hidden');
    }
    if(effect === 'chrome' || effect === 'sepia') {
      slider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    } else if(effect === 'marvin') {
      slider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    } else if(effect === 'phobos' || effect === 'heat') {
      slider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
    imgUploadPpreview.classList.add(`effects__preview--${effect}`);
  }
});

export {validateHashtags};
