import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPicturelikesCount = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');

const commentsTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const commentsUl = document.querySelector('.social__comments');
const loadMoreCommentsButton = document.querySelector('.comments-loader');
const commentsCountSpan = bigPicture.querySelector('.comments-count');
const bodyElement = document.querySelector('body');
let displayedCommentsCount = 0;

const loadMoreComments = function (comments) {
  const commentFragment = document.createDocumentFragment();
  const totalCommentsCount = comments.length;
  const remainingComments = totalCommentsCount - displayedCommentsCount;
  let commentsToDisplay;
  if (remainingComments > 5) {
    commentsToDisplay = 5;
  } else {
    commentsToDisplay = remainingComments;
  }
  for (let i = displayedCommentsCount; i < displayedCommentsCount + commentsToDisplay; i++) {
    const comment = comments[i];

    const commentElement = commentsTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentFragment.appendChild(commentElement);
  }
  commentsUl.appendChild(commentFragment);
  displayedCommentsCount += commentsToDisplay;

  if (displayedCommentsCount >= totalCommentsCount) {
    loadMoreCommentsButton.classList.add('hidden');
  }
};

const openBiggerPicture = function (pic) {
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

  bodyElement.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = pic.url;
  bigPictureImg.alt = pic.description;
  bigPicturelikesCount.textContent = pic.likes;
  bigPictureCaption.textContent = pic.description;
  commentsCountSpan.textContent = pic.comments.length;

  commentsUl.innerHTML = '';
  loadMoreComments(pic.comments);
  loadMoreCommentsButton.addEventListener('click', () => loadMoreComments(pic.comments));
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
