import { createPosts } from'./data.js';

import { renderPhotos } from './pictures.js'

const photoArray = createPosts();

renderPhotos(photoArray)
