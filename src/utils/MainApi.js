class MainApi {
    constructor({address, token}) {
        this.address = address;
        this.token = token;
    }

    _checkResponse(result) {
        if (result.ok) {
            return result.json()
        } else {
            return Promise.reject(`Ошибка: ${result.status}`);
        }
    }
      
    register(name, email, password) {
        return fetch(`${this.address}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        .then(this._checkResponse)
    };

    authorize(email, password) {
        return fetch(`${this.address}/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify({email, password})
        })
        .then(this._checkResponse)
    };
      
    checkToken(token) {
        return fetch(`${this.address}/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(this._checkResponse)
    }
    
    getMovies() {
        return fetch(`${this.address}/movies`, {
            method: 'GET',
            headers: {
                'authorization': this.token
            }
        })
        .then(this._checkResponse)
    }

    updateUserInfo(data) {
        return fetch(`${this.address}/users/me`, {
            method: 'PATCH',
            headers: {
                'authorization': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data['name'],
                email: data['email']
            })
        })
        .then(this._checkResponse)
    }

    addNewCard(card) {
        return fetch(`${this.address}/movies`, {
            method: 'POST',
            headers: {
                'authorization': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country: card.country || 'Неизвестно',
                director: card.director || 'Неизвестно',
                duration: card.duration,
                year: card.year || 'Неизвестно',
                description: card.description || 'Неизвестно',
                image: `https://api.nomoreparties.co${card.image.url}`,
                trailerLink: card.trailerLink,
                thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
                movieId: card.id,
                nameRU: card.nameRU,
                nameEN: card.nameEN || 'Неизвестно'
            })
        })
        .then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this.address}/movies/${cardId}`, {
            method: 'DELETE',
            headers: {
                'authorization': this.token
            }
        })
        .then(this._checkResponse)
    }
}

const mainApi = new MainApi({
    address: 'https://api.mymovies.nomoredomains.xyz',
    token: `Bearer ${localStorage.getItem('jwt')}`,
  });

export default mainApi;