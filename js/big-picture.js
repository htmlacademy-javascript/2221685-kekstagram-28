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
const currentCommentsCountSpan = bigPicture.querySelector('.current-comments-count');
const bodyElement = document.querySelector('body');
let displayedCommentsCount = 0;
let loadMoreCommentsButtonClickHandler = null;

const loadMoreComments = (comments) => {
  const commentFragment = document.createDocumentFragment();
  const totalCommentsCount = comments.length;
  const remainingComments = totalCommentsCount - displayedCommentsCount;
  const commentsToDisplay = remainingComments > 5 ? 5 : remainingComments;
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
  currentCommentsCountSpan.textContent = displayedCommentsCount;

  if (displayedCommentsCount >= totalCommentsCount) {
    loadMoreCommentsButton.classList.add('hidden');
  }
};

const openBiggerPicture = (pic) => {
  bodyElement.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = pic.url;
  bigPictureImg.alt = pic.description;
  bigPicturelikesCount.textContent = pic.likes;
  bigPictureCaption.textContent = pic.description;
  commentsCountSpan.textContent = pic.comments.length;

  commentsUl.innerHTML = '';
  loadMoreComments(pic.comments);
  loadMoreCommentsButtonClickHandler = () => loadMoreComments(pic.comments);
  loadMoreCommentsButton.addEventListener('click', loadMoreCommentsButtonClickHandler);
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  loadMoreCommentsButton.classList.remove('hidden');
  displayedCommentsCount = 0;
  loadMoreCommentsButton.removeEventListener('click', loadMoreCommentsButtonClickHandler);
  loadMoreCommentsButtonClickHandler = null;
  document.removeEventListener('keydown', onEscapeCloseModal);
};
function onEscapeCloseModal (evt) {
  if (isEscapeKey(evt)) {
    closeModal();
  }
}

document.addEventListener('keydown', onEscapeCloseModal);

closeBigPictureButton.addEventListener('click', () => {
  closeModal();
});


export {openBiggerPicture};
