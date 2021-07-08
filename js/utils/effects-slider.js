const sliderElement = document.querySelector('.effect-level__slider');
const effectList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('change', (_, handle, unencoded) => {
  effectLevelValue.value = unencoded[handle];
});


effectList.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 0.3,
      step: 0.1,
    });

  }
});
