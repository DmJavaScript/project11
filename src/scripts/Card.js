import {name, link, popupImage} from './variables.js';

export class Card {
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