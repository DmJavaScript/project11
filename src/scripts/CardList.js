import {name, link, initialCards} from './variables.js';
import {Card} from './Card.js';

export class CardList {
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