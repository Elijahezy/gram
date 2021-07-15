const URL_GET_DATA = 'https://23.javascript.pages.academy/kekstagram/data';
const URL_SEND_DATA = 'https://23.javascript.pages.academy/kekstagram';

const getData = (onFail) => fetch(URL_GET_DATA)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .catch(onFail);

const sendData = (onSuccess, onFail, body) => {
  fetch(URL_SEND_DATA,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .catch(onFail);
};

export { getData, sendData };
