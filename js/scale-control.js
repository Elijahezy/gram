const btnScaleSmaller = document.querySelector('.scale__control--smaller');
const btnScaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const SCALE_VALUE_STEP = 25;
const CURRENT_CONTROL_VALUE = 1;
const MAX_VALUE = 100;
const MIN_VALUE = 25;


const onIncreaseScale = () => {
  let value = +scaleValue.value.replace(/[^\d]/g, '');
  if (value < MAX_VALUE) {
    scaleValue.value = `${value += SCALE_VALUE_STEP}%`;
    imgPreview.style.transform = `scale(${value/100})`;
  } scaleValue.value = `${value}%`;
};

const onDecreaseScale = () => {
  let value = +scaleValue.value.replace(/[^\d]/g, '');
  if (value > MIN_VALUE) {
    scaleValue.value = `${value -= SCALE_VALUE_STEP}`;
    imgPreview.style.transform = `scale(${value/100})`;
  } scaleValue.value = `${value}%`;
};

const activateScaleChanger = () => {
  btnScaleBigger.addEventListener('click', onIncreaseScale);
  btnScaleSmaller.addEventListener('click', onDecreaseScale);
};

const deactivateScaleChanger = () => {
  btnScaleBigger.removeEventListener('click', onIncreaseScale);
  btnScaleSmaller.removeEventListener('click', onDecreaseScale);
  scaleValue.value = `${MAX_VALUE}%`;
};

export {activateScaleChanger, deactivateScaleChanger, CURRENT_CONTROL_VALUE};
