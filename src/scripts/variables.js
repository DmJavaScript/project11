export const initialCards = [];
const options = {};

import {Api} from './Api.js';
const serverUrl = NODE_ENV === 'development' ? 'https://mesto.nomoreparties.co/cohort3' : 'http://mesto.nomoreparties.co/cohort3';
export const api = new Api({
    baseUrl: serverUrl,
    headers: {
      authorization: '2be5a16d-b37d-40f5-850a-90e709aeb96d',
      'Content-Type': 'application/json'
    }
});

import {CardList} from './CardList.js';
api.getInitialCards().then(data => {
  const cardList = new CardList(document.querySelector('.places-list'), data)
});

import {User} from './User.js';
api.getUserId().then(data => new User(data.name, data.about, data.avatar));




const placesList = document.querySelector('.places-list');
const placeCard = document.querySelector('.place-card');
export const cardList = new CardList(placesList, initialCards);

import {Popup, PopupImage} from './popups.js';
const popupEditProfile = new Popup (document.querySelector('.popup__edit-profile'), document.querySelector('.user-info__button-edit'));
export const popupAddPlace = new Popup (document.querySelector('.popup__add-place'), document.querySelector('.user-info__button'));
export const popupImage = new PopupImage (document.querySelector('.popup__fullscreen_background'));


export const formNewPlace = document.forms.new;


export const name = document.querySelector('#name');
export const profession = document.querySelector('#profession');
export const place = document.querySelector('#place');
export const link = document.querySelector('#link');