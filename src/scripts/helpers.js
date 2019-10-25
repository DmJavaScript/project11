//Функция ручного добавления карточек на сайт
import {api, formNewPlace, popupAddPlace, cardList} from './variables.js';

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
  
  //Валидация
  import {name, profession, place, link} from './variables.js';

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