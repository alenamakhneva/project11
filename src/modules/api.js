const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3';
const authorization = 'b025614a-04c1-416e-94c9-d1a74837e2eb';

class Api {
    constructor({ serverUrl, headers: { authorization } }) {
        this.serverUrl = serverUrl
        this.token = authorization     
        
    }

    getProfile() { // запрос исходных данных пользователя
        
        return fetch(`${this.serverUrl}/users/me`, {
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })

            .then((user) => {
                return user
            }) 
            .catch((err) => {
                console.log(err);
            });
    }

    getInitialCards() { // начальный список карточек

        return fetch(`${this.serverUrl}/cards`, {
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })

            .catch((err) => {
                console.log(err);
            });

    }

    editProfile(name, about) { // редактирование профиля
        return fetch(`${this.serverUrl}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name,about }) 
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })

            .catch((err) => {
                console.log(err);
            });

    }

    addMyCard(name, link) { // добавление новой карточки

        return fetch(`${this.serverUrl}/cards`, {
                method: 'POST',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, link })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    

            .catch((err) => {
                console.log(err);
            });
    }
}

export {Api, serverUrl, authorization};