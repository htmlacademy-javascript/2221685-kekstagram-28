import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPicturelikesCount = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');

const commentsTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const commentsUl = document.querySelector('.social__comments');

const bodyElement = document.querySelector('body');

const openBiggerPicture = function (pic) {
  bodyElement.classList.add('modal-open');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = pic.url;
  bigPictureImg.alt = pic.description;
  bigPicturelikesCount.textContent = pic.likes;
  bigPictureCaption.textContent = pic.description;

  commentsUl.innerHTML = '';
  const commentFragment = document.createDocumentFragment();

  pic.comments.forEach((comment) => {
    const commentElement = commentsTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentFragment.appendChild(commentElement);
  });
  commentsUl.appendChild(commentFragment);
};

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    bigPicture.classList.add('hidden');
    bodyElement.classList.remove('modal-open');

  }
});

closeBigPictureButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
});

export {openBiggerPicture};
