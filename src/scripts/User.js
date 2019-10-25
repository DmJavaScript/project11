export class User {
    constructor(name, about, avatar) {
        this.name = name;
        this.about = about;
        this.avatar = avatar;
        this.createUser();
    }

    createUser() /*метод будет создавать DOM-элемент профиля (структуру в HTML), через свойство родительства создаём прототип)*/{
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