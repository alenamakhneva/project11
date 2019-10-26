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
  baseUrl: 'http://95.216.175.5/cohort3',
  headers: {
    authorization: 'b025614a-04c1-416e-94c9-d1a74837e2eb',
    'Content-Type': 'application/json'
  }
});

api.getProfile().then((user) => {
  /**
   * Можно улучшить
   * 
   * Для защиты от ошибок лучше проверять наличие всех ключей в запросе
   * if (user.name && user.about) { обновляем разметку }
   */
  initialName.textContent = user.name
  initialJob.textContent = user.about
  initialAvatar.setAttribute('style', "background-image: url(" + user.avatar + ")")
})

let cardList

api.getInitialCards().then(cards => {
  /**
   * Для защиты от ошибок лучше проверять наличие количества элементов в массиве
   * если карточек нет в консоли будет ошибка
   * 
   * проверка if (cards && cards.length > 0) поможет избежать остановки работы приложения
   * 
   */
  cardList = new CardList(placesList, cards)
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
    // Лучше использовать const - нет перезаписи данных
    api.editProfile(name, about)

    // Можно улучшить
    // В ответе приходят записанные данные - 
    // следует выполнять then в запросе редактирования
    // getProfile получает старые данные
    
    api.getProfile().then(user => {
      // лучше проверять наличие данных перед отрисовкой
      initialName.textContent = user.name
      initialJob.textContent = user.about
    })
  })

document.querySelector('#place-form')
  .addEventListener('submit', event => {
    event.preventDefault();
    let name = document.querySelector('#placename').value
    let link = document.querySelector('#place-link').value //const
    api.addMyCard(name, link).then((card) => {
      cards.push(new Card(card.name, card.link))
      // Можно улучшить - не обязательно
      // не очень понятно куда добавляется карточка
      // лучше делать cardList.addCard
    })
  })