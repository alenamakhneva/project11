import { Api, serverUrl, authorization } from "./api.js"
import { Popup, ProfileEdit, UserCard} from "./popups.js";
import { Card, CardList } from "./card.js";

//Переменные
const placesList = document.querySelector('.places-list')
const addButton = document.querySelector('.user-info__button')
const editButton = document.querySelector('.user-info__edit-button')
const initialName = document.querySelector('.user-info__name')
const initialJob = document.querySelector('.user-info__job')
const initialAvatar = document.querySelector('.user-info__photo')
const errorMessages = {
  required: 'Это обязательное поле',
  length: 'Должно быть от 2 до 30 символов',
  link: 'Здесь должна быть ссылка'
}


//запросы на сервер
const api = new Api({
  serverUrl, 
  headers: {
    authorization: authorization,
    'Content-Type': 'application/json'
  }
});

api.getProfile().then((user) => {
   if (user.name && user.about) {  
  initialName.textContent = user.name
  initialJob.textContent = user.about
  initialAvatar.setAttribute('style', "background-image: url(" + user.avatar + ")")
}
})

let cardList

api.getInitialCards().then(cards => {
 if (cards && cards.length > 0) {
  cardList = new CardList(placesList, cards)
}
});


// создание попапа для картинки
const cardPopup = document.querySelector('.image-popup')
const imagePopup = new Popup(cardPopup)
// ---

// создание попапа для редактирования профиля
const profilePopup = document.getElementById('profile-popup')
const profileEditPopup = new ProfileEdit(profilePopup, editButton)
// ----

// создание попапа для добавления карточки
const placePopup = document.getElementById('place-popup')
const placeAddPopup = new UserCard(placePopup, addButton)
// ----

// слушатели событий
document.querySelector('#profile-form')
  .addEventListener('submit', event => {
    event.preventDefault()
    let name = document.querySelector('#username').value
    let about = document.querySelector('#job').value
    api.editProfile(name, about)
    
    api.getProfile().then(user => {
      if (user.name && user.about) {
      initialName.textContent = user.name
      initialJob.textContent = user.about
      }
    })
  })

document.querySelector('#place-form')
  .addEventListener('submit', event => {
    event.preventDefault();
    let name = document.querySelector('#placename').value
    let link = document.querySelector('#place-link').value //const
    api.addMyCard(name, link).then((card) => {
      cards.push(new Card(card.name, card.link))
    
    })
  })

  export { errorMessages, placesList, initialName };