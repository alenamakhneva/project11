class Card {
  constructor(name, link) {
    this.name = name
    this.link = link
    this.create()
  }

  create() { // создает DOM-элемент карточки
    const image = document.createElement('div')
    const descript = document.createElement('div')
    const cardName = document.createElement('h3')
    const buttonLike = document.createElement('button')
    const buttonDel = document.createElement('button')
    const placeCard = document.createElement('div')

    placeCard.classList.add('place-card')
    image.classList.add('place-card__image')
    image.style.backgroundImage = 'url(' + this.link + ')'

    descript.classList.add('place-card__description')
    cardName.classList.add('place-card__name')
    cardName.textContent = this.name

    buttonLike.classList.add('place-card__like-icon')
    buttonDel.classList.add('place-card__delete-icon')

    buttonLike.addEventListener('click', this.like)
    buttonDel.addEventListener('click', this.remove)
    image.addEventListener('click', this.applyImage)

    image.appendChild(buttonDel)
    descript.appendChild(cardName)
    descript.appendChild(buttonLike)
    placeCard.appendChild(image)
    placeCard.appendChild(descript)

    return placeCard
  }

  like(event) {
    event.stopPropagation()
    event.target.classList.toggle('place-card__like-icon_liked')
  }

  remove(event) {
    event.stopPropagation()
    event.target.closest('.place-card').remove()
  };

  applyImage(event) {
    event.stopImmediatePropagation()
    this.container = document.querySelector('.image-popup')
    const imagePopupContent = document.querySelector('.image-popup__content')
    let popupImage = document.querySelector('.image-popup__image')
    if (!popupImage) {
      popupImage = document.createElement('img')
      popupImage.classList.add('image-popup__image')
      popupImage.setAttribute('src', event.target.style.backgroundImage.slice(5, length - 2))
      imagePopupContent.appendChild(popupImage)
      this.container.classList.add('popup_is-opened')
    } else {
      popupImage.setAttribute('src', '')
      popupImage.setAttribute('src', event.target.style.backgroundImage.slice(5, length - 2))
      this.container.classList.add('popup_is-opened')
    }
  }
}

class CardList {
  constructor(container, cards) {
    this.container = container
    this.cards = cards
    this.name = cards.name
    this.link = cards.link
    this.render()
  }

  addCard(name, link) { // добавление карточек в список
    const cardItem = new Card(name, link)
    placesList.appendChild(cardItem.create())
  }

  render() { // отрисовка карточек при загрузке страницы
    this.cards.forEach(({
        name,
        link
      }) =>
      this.addCard(name, link))
  }
}