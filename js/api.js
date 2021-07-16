import { showAlert } from './utils.js';

const URL_GET_DATA = 'https://23.javascript.pages.academy/kekstagram/data';
const URL_SEND_DATA = 'https://23.javascript.pages.academy/kekstagram';

const onResponseCallback = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(`${response.status} — ${response.statusText}`);
};

const getData = (onSuccess) => fetch(URL_GET_DATA)
  .then(onResponseCallback)
  .then(onSuccess())
  .catch(() => {
    showAlert('Не удалось получить данные с сервера. Попробуйте ещё раз.');
  });

const sendData = (onSuccess, body) => {
  fetch(URL_SEND_DATA,
    {
      method: 'POST',
      body,
    },
  )
    .then(onResponseCallback)
    .then(onSuccess())
    .catch(() => {
      showAlert();
    });
};
export { getData, sendData };
