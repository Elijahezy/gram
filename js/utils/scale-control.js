const btnScaleSmaller = document.querySelector('.scale__control--smaller');
const btnScaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const SCALE_VALUE_STEP = 25;
const CURRENT_CONTROL_VALUE = 1;
const MAX_VALUE = 100;
const MIN_VALUE = 25;


const increaseScale = () => {
  let value = +scaleValue.value.replace(/[^\d]/g, '');
  if (value < MAX_VALUE) {
    scaleValue.value = `${value += SCALE_VALUE_STEP}%`;
    imgPreview.style.transform = `scale(${value/100})`;
  } scaleValue.value = `${value}%`;
};

const decreaseScale = () => {
  let value = +scaleValue.value.replace(/[^\d]/g, '');
  if (value > MIN_VALUE) {
    scaleValue.value = `${value -= SCALE_VALUE_STEP}`;
    imgPreview.style.transform = `scale(${value/100})`;
  } scaleValue.value = `${value}%`;
};

const activateScaleChanger = () => {
  btnScaleBigger.addEventListener('click', increaseScale);
  btnScaleSmaller.addEventListener('click', decreaseScale);
};

const deactivateScaleChanger = () => {
  btnScaleBigger.removeEventListener('click', increaseScale);
  btnScaleSmaller.removeEventListener('click', decreaseScale);
  scaleValue.value = `${MAX_VALUE}%`;
};

export {activateScaleChanger, deactivateScaleChanger, CURRENT_CONTROL_VALUE};
