import { renderPhotos } from './pictures.js';
import './form.js';
import {getData} from './server.js';
import './user-photo.js';
const onSucc = (data) => {
  renderPhotos(data);
};

const loadPhotosFunc = getData(onSucc, console.error);

loadPhotosFunc();
