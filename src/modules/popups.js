import { errorMessages, initialName, initialJob } from "./script.js"

class Popup {
  constructor(container) {
    this.container = container
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.container
      .querySelector('.popup__close')
      .addEventListener('click', this.close)
  }
  close() {
    this.container.classList.remove('popup_is-opened')
  }
  open() {
    this.container.classList.add('popup_is-opened')
  }
}

class PopupWithValidation extends Popup {
  constructor(container, button) {
    super(container)
    this.button = button
    this.button.addEventListener('click', this.open)
    this.form = this.container.querySelector('form')
    this.inputs = this.form.querySelectorAll('input')
    this.validate()
    this.disableButton()
  }

  validate() {
    this.form.addEventListener('keyup', event => {
      let errors = 0

      for (let x = 0; x < this.inputs.length; x++) {
        const errorElement = document.querySelector(`#error-${this.inputs[x].id}`)

        if (this.inputs[x].value.length < 1) {
          this.disableButton()
          errorElement.textContent = errorMessages.required
          errorElement.classList.remove('error-message_hidden')
          errors++
          continue
        }

        if (!(this.inputs[x].type === 'url') &&
          ((this.inputs[x].value.length < 2) ||
            (this.inputs[x].value.length > 30))) {
          errorElement.textContent = errorMessages.length
          errorElement.classList.remove('error-message_hidden')
          errors++
          continue
        }

        if (this.inputs[x].validity.typeMismatch) {
          errorElement.textContent = errorMessages.link
          errorElement.classList.remove('error-message_hidden')
          errors++
          continue
        }

        if (errors === 0) {
          errorElement.classList.add('error-message_hidden')
          errorElement.textContent = ''
          this.enableButton()

        }
      }
    })
  }

  disableButton() {
    this.form.querySelector('button').setAttribute('disabled', true)
    this.form.querySelector('button').classList.add('popup__button_disabled')
  }

  enableButton() {
    this.form.querySelector('button').removeAttribute('disabled')
    this.form.querySelector('button').classList.remove('popup__button_disabled')
    this.form.querySelector('button').classList.add('popup__button_enabled')
  }
}

class ProfileEdit extends PopupWithValidation {
  constructor(container, button) {
    super(container, button)
    this.button.addEventListener('click', event => {
      this.form.querySelector('#username').value = initialName.textContent
      this.form.querySelector('#job').value = initialJob.textContent
    })
    this.form.addEventListener('submit', event => {
      event.preventDefault()
      this.close()
    })
  }
}

class UserCard extends PopupWithValidation {
  constructor(container, button) {
    super(container, button)
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      this.close()
    })
  }
}

export {Popup, ProfileEdit, UserCard};