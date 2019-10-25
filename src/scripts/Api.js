import {name, link} from './variables.js';

export class Api {
    constructor(options) {
      this.options = options;
    }

    getUserId () {
      return fetch(`${this.options.baseUrl}/users/me`, {
        headers: this.options.headers,
        method: 'GET'
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
      })
    }

    getInitialCards() {
      return fetch(`${this.options.baseUrl}/cards`, {
        headers: this.options.headers,
        method: 'GET'
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
      })
    }

    editProfile (name, about) {
      return fetch(`${this.options.baseUrl}/users/me`,  {
        headers: this.options.headers,
        method: 'PATCH',
        body: JSON.stringify({
          name,
          about
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
      })
    }

    // не для ревью, необязательное задание!
    addNewCard (name, link) {
      return fetch(`${this.options.baseUrl}/cards`,  {
        headers: this.options.headers,
        method: 'POST',
        body: JSON.stringify({
          name,
          link
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
      })
    }
}
