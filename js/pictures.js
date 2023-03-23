import { openBiggerPicture } from './big-picture.js';

const sectionPictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const sectionFagment = document.createDocumentFragment();

const renderPhotos = (photos) => {
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

export {renderPhotos};
