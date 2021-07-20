import { showAlert } from './utils.js';

const URL_GET_DATA = 'https://23.javascript.pages.academy/kekstagram/data';
const URL_SEND_DATA = 'https://23.javascript.pages.academy/kekstagram';

const onResponseCallback = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(`${response.status} — ${response.statusText}`);
};

const customFetch = (url, body = null) => fetch(url,
  {
    method: body ? 'POST' : 'GET',
    body,
  },
).then(onResponseCallback);

const getData = (onSuccess) => customFetch(URL_GET_DATA)
  .then(onSuccess())
  .catch(() => {
    showAlert('Не удалось получить данные с сервера. Попробуйте ещё раз.');
  },
  );

const sendData = (onSuccess, onFail, body) => {
  customFetch(URL_SEND_DATA, body)
    .then(onSuccess)
    .catch(() => {
      showAlert('Не удалось отправить данные на сервер. Попробуйте ещё раз.');
    });
};
export { getData, sendData };
