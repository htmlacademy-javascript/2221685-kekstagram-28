const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const chosenFile = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');

chosenFile.addEventListener('change', () => {
  const file = chosenFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});
