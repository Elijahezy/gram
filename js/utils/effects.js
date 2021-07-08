const effectsRadio = document.querySelectorAll('.effects__item');
const imgPreview = document.querySelector('.img-upload__preview img');

const features = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

effectsRadio.forEach((item, index) => { item.addEventListener('click', (evt) => {
  if (evt.target.checked === true && evt.target !== item[0]) {
    imgPreview.className = 'effects__preview--none';
    imgPreview.classList.add(`effects__preview--${  features[index]}`);
  }
});
});


