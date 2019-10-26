class Api {
    constructor(options) {
        this.serverUrl = options.serverUrl
        this.headers = options.headers        
        /**
         * Можно улучшить
         * 
         * Для создания коротких переменных удобно разбирать входящие объекты
         * 
         * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
         * 
         * constructor({ baseUrl, headers: { authorization } }) {
         *  this.baseUrl = baseUrl
         *  this.token = authorization
         * }
         */
    }

    getProfile() { // запрос исходных данных пользователя
        /**
         * Надо исправить
         * 
         * Адреса запросов составляются из переменной
         * из запроса возвращается результат через
         * return fetch(`${this.url}/users/me`)
         * 
         * токен из полей класса лучше получать
         */
        return fetch(`${this.serverUrl}/users/me`, {
                headers: {
                    authorization: this.headers.authorization,
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
            }) // Можно улучшить в запросе достаточно первого then
            .catch((err) => {
                console.log(err);
            });
    }

    getInitialCards() { // начальный список карточек

        return fetch(`${this.baseUrl}/cards`, {
                headers: {
                    authorization: this.headers.authorization,
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
                    authorization: this.headers.authorization,
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

        return fetch(`${this.baseUrl}/cards`, {
                method: 'POST',
                headers: {
                    authorization: this.headers.authorization,
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

/**
 * Класс для работы с данными огранизован аккуратно
 * 
 * Обратите внимание на вызовы методов
 * Достаточно запускать запрос редактирования и брать данные
 * из ответа, так на странице будут подставляться новые данные
 * сразу после ответа сервера, второй запрос getUser лишний
 * ответ в then редактирования лучше брать
 */