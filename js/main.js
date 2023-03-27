import { createPosts } from'./data.js';

import { renderPhotos } from './pictures.js';

import './form.js';
const photoArray = createPosts();

renderPhotos(photoArray);


