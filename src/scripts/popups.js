import {api} from './variables.js';

export class Popup {
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

export class PopupImage extends Popup {
    constructor (container) {
      super(container);
    }

    open(link) {// по совету ревьюера, расширил метод родителя чтобы тогда не вызывать два метода для открытия изображения
      this.container.querySelector('.popup__fullscreen_image').setAttribute('src', link);
      super.open();
    }
}