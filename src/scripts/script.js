const initialCards = [];
const options = {};

class Api {
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


const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort3',
    headers: {
      authorization: '2be5a16d-b37d-40f5-850a-90e709aeb96d',
      'Content-Type': 'application/json'
    }
});
// удалил переменные id, ip, token ввиду ненужности, последовав совету ревьюера.

api.getInitialCards().then(data => {
  const cardList = new CardList(document.querySelector('.places-list'), data)
});


class User {
    constructor(name, about, avatar) {
        this.name = name;
        this.about = about;
        this.avatar = avatar;
        this.createUser();
    }

    createUser() /*метод будет создавать DOM-элемент карточки (структуру в HTML), через свойство родительства создаём прототип)*/{
        const userInfoPhotoElement = document.createElement('div');
        const userInfoNameElement = document.createElement('h1');
        const userInfoJobElement = document.createElement('p');

        userInfoPhotoElement.classList.add('user-info__photo');
        userInfoNameElement.classList.add('user-info__name');
        userInfoJobElement.classList.add('user-info__job');

        userInfoPhotoElement.style.backgroundImage = 'url(' + this.avatar + ')';
        userInfoNameElement.textContent = this.name;
        userInfoJobElement.textContent = this.about;

        //родительство и рендер
        document.querySelector('.user-info').insertBefore(userInfoPhotoElement, document.querySelector('.user-info__data'));
        document.querySelector('.user-info__data').insertBefore(userInfoNameElement, document.querySelector('.user-info__button-edit'));
        document.querySelector('.user-info__data').insertBefore(userInfoJobElement, document.querySelector('.user-info__button-edit'));
    }
}

api.getUserId().then(data => new User(data.name, data.about, data.avatar));

class Card {
    constructor(name, link) {
        this.name = name;
        this.link = link;
        this.cardElement = this.create();
        this.cardElement
            .querySelector('.place-card__like-icon')
            .addEventListener('click', this.like);
        this.cardElement
            .querySelector('.place-card__delete-icon')
            .addEventListener('click', this.remove);

        this.create = this.create.bind(this);
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
    }

    create() /*метод будет создавать DOM-элемент карточки (структуру в HTML), через свойство родительства создаём прототип)*/ {
        const placeContainer = document.createElement('div');
        const placePhotoElement = document.createElement('div');
        const binButtonElement = document.createElement('button');
        const placeDescriptionContainer = document.createElement('div');
        const placeNameElement = document.createElement('h3');
        const likeButtonElement = document.createElement('button');

        placeContainer.classList.add('place-card');
        placePhotoElement.classList.add('place-card__image')
        /* Можно лучше: лучше код для открытия изображения карточки вынести также как и like и remove
        в отдельный метод */
        placePhotoElement.addEventListener('click', () => {
            popupImage.open(this.link);
        });
        binButtonElement.classList.add('place-card__delete-icon');
        placeDescriptionContainer.classList.add('place-card__description');
        placeNameElement.classList.add('place-card__name');
        likeButtonElement.classList.add('place-card__like-icon');

        placePhotoElement.style.backgroundImage = 'url(' + `${this.link}` + ')';
        placeNameElement.textContent = `${this.name}`;

        //родительство
        placeContainer.appendChild(placePhotoElement);
        placeContainer.appendChild(placeDescriptionContainer);
        placePhotoElement.appendChild(binButtonElement);
        placeDescriptionContainer.appendChild(placeNameElement);
        placeDescriptionContainer.appendChild(likeButtonElement);

        return placeContainer;
    }

    like(event) {
        this.classList.toggle('place-card__like-icon_liked');
    }

    remove(event) {
        event.stopPropagation();
        this.closest('.place-card').remove();
    }
}

class CardList {
    constructor(container/*контейнер куда нужно складывать карточки*/,initialCards/* массив карточек при первоначальной загрузке*/) {
      this.container = container;
      this.initialCards = initialCards;
      this.render();
    }

    addCard(name, link) { //метод для добавления карточки в список
      const{cardElement} = new Card(name,link);
      this.container.appendChild(cardElement);
    }

    render() { //метод для автоматической отрисовки карточек из списка addCard
      this.initialCards.forEach(({name,link}) =>
      this.addCard(name,link)
      )
    }
}


class Popup {
    constructor (container, button) {
        this.container = container;

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        
        api.getUserId().then(data => {
            document.querySelector('.popup__input_type_name').value = data.name;
            document.querySelector('.popup__input_type_profession').value = data.about;
        })
    

        if (button) {
          this.button = button;
          this.button
         .addEventListener('click',  this.open)
       }

        this.container
            .querySelector('.popup__close')
            .addEventListener('click', this.close);
    }

    open() {
        this.container.classList.add('popup_is-opened');
    }

    close() {
        this.container.classList.remove('popup_is-opened');
    }
}

class PopupImage extends Popup {
    constructor (container) {
      super(container);
    }

    open(link) {// по совету ревьюера, расширил метод родителя чтобы тогда не вызывать два метода для открытия изображения
      this.container.querySelector('.popup__fullscreen_image').setAttribute('src', link);
      super.open();
    }
}

const placesList = document.querySelector('.places-list');
const placeCard = document.querySelector('.place-card');
const cardList = new CardList(placesList, initialCards);

const popupEditProfile = new Popup (document.querySelector('.popup__edit-profile'), document.querySelector('.user-info__button-edit'));
const popupAddPlace = new Popup (document.querySelector('.popup__add-place'), document.querySelector('.user-info__button'));
const popupImage = new PopupImage (document.querySelector('.popup__fullscreen_background'));


//Функция ручного добавления карточек на сайт

const formNewPlace = document.forms.new;

formNewPlace.addEventListener('submit', function (event) {
  event.preventDefault();
  api.addNewCard(formNewPlace.elements.place.value, formNewPlace.elements.link.value).then(data => {
    cardList.addCard(data.name, data.link);
  })
  popupAddPlace.close();
  formNewPlace.reset();
});


//Редактирование имени и информации о себе

document.forms.profile.addEventListener('submit', function saveChanges (event) {
  event.preventDefault();
  api.editProfile(document.querySelector('#name').value, document.querySelector('#profession').value).then(data => {
    document.querySelector('.user-info__name').textContent = data.name;
    document.querySelector('.user-info__job').textContent = data.about;
  })
  document.querySelector('.popup__edit-profile').classList.remove('popup_is-opened');
});

//Простая валидация заполнености всех полей у формы

document.querySelector('#form-profile').addEventListener('input', filledValuesButtonFF);
document.querySelector('#form-new').addEventListener('input', filledValuesButtonSF);

function filledValuesButtonFF () {
    if (document.querySelector('#name').value !== '' && document.querySelector('#profession').value !== '' ) {
      document.querySelector('#submit-info').removeAttribute("disabled");
      document.querySelector('#submit-info').classList.add('black-button');
    }
    if (document.querySelector('#name').value === '' || document.querySelector('#profession').value === '' ) {
      document.querySelector('#submit-info').setAttribute("disabled", "true");
      document.querySelector('#submit-info').classList.remove('black-button');
    }
}

function filledValuesButtonSF () {
  // включаю кнопку
  if (document.querySelector('#place').value !== '' && document.querySelector('#link').value !== '' && document.querySelector('#link').checkValidity()) {
    document.querySelector('#submit-place').removeAttribute("disabled");
    document.querySelector('#submit-place').classList.add('black-button');
  }
  // должна отключается кнопка
  if (document.querySelector('#place').value === '' || document.querySelector('#link').value === '' ) {
    document.querySelector('#submit-place').setAttribute("disabled", "true");
    document.querySelector('#submit-place').classList.remove('black-button');
  }
}

//5.Валидация
const name = document.querySelector('#name');
const profession = document.querySelector('#profession');
const place = document.querySelector('#place');
const link = document.querySelector('#link');

function validate () {
    if (!name.checkValidity()) {
      setupValidationMessages (name);
      document.querySelector('#error-name').textContent = name.validationMessage;
      name.parentNode.classList.add('input-container__invalid');
      return false;
    }
    if (!profession.checkValidity()) {
      setupValidationMessages (profession);
      document.querySelector('#error-profession').textContent = profession.validationMessage;
      profession.parentNode.classList.add('input-container__invalid');
      return false;
    }
    if (!place.checkValidity()) {
      setupValidationMessages (place);
      document.querySelector('#error-place').textContent = place.validationMessage;
      place.parentNode.classList.add('input-container__invalid');
      return false;
    }
    if (!link.checkValidity()) {
      setupValidationMessages (link);
      document.querySelector('#error-link').textContent = link.validationMessage;
      link.parentNode.classList.add('input-container__invalid');
      return false;
    }
}


function setupValidationMessages (element) {
  if (element.value.length < 1) {
    element.setCustomValidity('Это обязательное поле');
  }
  if (element.value.length === 1 ) {
    element.setCustomValidity('Должно быть от 2 до 30 символов');
  }
  if (element.value.length > 1 ) {
    element.setCustomValidity('');
  }
  if (element.validity.typeMismatch) {
    element.setCustomValidity('Здесь должна быть ссылка');
  }
}

function finalFieldCheck (event){
  event.target.parentNode.classList.remove('input-container__invalid');
  validate ();
}

name.addEventListener('input', finalFieldCheck);
profession.addEventListener('input', finalFieldCheck);
place.addEventListener('input', finalFieldCheck);
link.addEventListener('input', finalFieldCheck);


