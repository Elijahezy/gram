const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview img');
const userForm = document.querySelector('.img-upload__form');

const NONE_EFFECT = 'none';
let currentEffect;

const effectToOptions = {
  chrome: {
    filterName: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
  },
  sepia: {
    filterName: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
  },
  marvin: {
    filterName: 'invert',
    unit: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
    },
  },
  phobos: {
    filterName: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    },
  },
  heat: {
    filterName: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    },
  },
};


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0.8,
  step: 0.1,
  connect: 'lower',
});

const turnEffectLevel = (effectName) => {
  const {
    options,
    filterName,
    unit,
  } = effectToOptions[effectName];

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.updateOptions(options);
  } else {
    noUiSlider.create(sliderElement, options);
  }

  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    const value = unencoded[handle];
    effectLevelValue.value = value;
    imgPreview.style.filter = `${filterName}(${value}${unit})`;
  });

};

const destroyEffectLevel = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  effectLevelValue.value = '';
  imgPreview.style.filter = '';
};

const onFilterChange = (evt) => {
  currentEffect = evt.target.value;
  if (evt.target.matches('.effects__radio')) {
    imgPreview.className = '';
    imgPreview.classList.add(`effects__preview--${evt.target.value}`);
    if (currentEffect === NONE_EFFECT) {
      destroyEffectLevel();
    } else {
      turnEffectLevel(currentEffect);
    }
  }
};

const onEffects = () => {
  currentEffect = NONE_EFFECT;
  imgPreview.classList.add('img-upload__preview');
  imgPreview.classList.add(`effects__preview--${currentEffect}`);
  userForm.addEventListener('change', onFilterChange);
};

const offEffects = () => {
  destroyEffectLevel();
  imgPreview.classList.remove('img-upload__preview');
  imgPreview.classList.remove(`effects__preview--${currentEffect}`);
  userForm.removeEventListener('change', onFilterChange);
};

export { onEffects, offEffects, onFilterChange };
