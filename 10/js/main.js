// import { createPosts } from'./data.js';

import { renderPhotos } from './pictures.js';

import './form.js';


import {getData} from './server.js'; //импортировать функцию которая оборачивает fetch
// const photoArray = createPosts();

// renderPhotos(photoArray);//вместо photoArrey указать функцию оборачивающую fetch

const onSucc = (data) => {
  renderPhotos(data);
};

const loadPhotosFunc = getData(onSucc, console.error);

loadPhotosFunc();


