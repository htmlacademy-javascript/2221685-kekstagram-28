import { openBiggerPicture } from './big-picture.js';
import { shuffle, debounce } from './util.js';

const sectionPictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const sectionFagment = document.createDocumentFragment();

const showFiltersField = () => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const attachPhotosToUl = (photos) => {
  /* photos
  [{
    id: number;
    url: string;
    description: string;
    likes: number;
    comments: [{
        id: number;
        avatar: string;
        message: string;
        name: string;
    }];
  }]
  */

  const existingPictures = sectionPictures.querySelectorAll('.picture');
  if(existingPictures.length > 0){
    existingPictures.forEach((picture) => picture.remove());
  }
  photos.forEach((pic) => {
  /* pic
  {
    id: number;
    url: string;
    description: string;
    likes: number;
    comments: [{
        id: number;
        avatar: string;
        message: string;
        name: string;
    }];
  }
  */
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').alt = pic.description;
    pictureElement.querySelector('.picture__img').src = pic.url;
    pictureElement.querySelector('.picture__comments').textContent = pic.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = pic.likes;
    sectionFagment.appendChild(pictureElement);

    pictureElement.addEventListener('click', () => {
      openBiggerPicture(pic);
    });
  });
  sectionPictures.appendChild(sectionFagment);
};

const filterButtonDiscussed = (pic1, pic2) => pic2.comments.length - pic1.comments.length;

const renderPhotos = (photos) => {
  attachPhotosToUl(photos);
  showFiltersField();

  const imgFiltersButtons = document.querySelectorAll('.img-filters__button');

  imgFiltersButtons.forEach((button) => {

    button.addEventListener('click', debounce(() => {
      imgFiltersButtons.forEach((btn) => {
        btn.classList.remove('img-filters__button--active');
      });
      button.classList.add('img-filters__button--active');
      if (button.id === 'filter-default') {
        attachPhotosToUl(photos);
      }
      if (button.id === 'filter-random') {
        const shuffledPhotos = photos.slice().sort(shuffle);
        attachPhotosToUl(shuffledPhotos);
      }
      if (button.id === 'filter-discussed') {
        const discussedPictures = photos.slice().sort(filterButtonDiscussed);
        attachPhotosToUl(discussedPictures);
      }
    },500
    ));
  });

  // add listener to fitler buttons,
  //  on fliter button click
  //    you filter/shuffle the photoes
  //    you need to call attachPhotosToUl(shuffledPhotos) with new a shuffled array
  //    remember to clear up the UL list before attaching new photos
};

export {renderPhotos};