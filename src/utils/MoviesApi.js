class MoviesApi {
    constructor({address}) {
        this.address = address;
    }

    _checkResponse(result) {
        if (result.ok) {
            return result.json()
        } else {
            return Promise.reject(`Ошибка: ${result.status}`);
        }
    }

    getMovies() {
        return fetch(`${this.address}`, {
            method: 'GET'
        })
        .then(this._checkResponse)
    }
}

const moviesApi = new MoviesApi({
    address: 'https://api.nomoreparties.co/beatfilm-movies',
  });

export default moviesApi;