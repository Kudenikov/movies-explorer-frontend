import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import ResultBlock from '../ResultBlock/ResultBlock';
import Preloader from '../Preloader/Preloader';
import React, { useState } from 'react';
import mainApi from '../../utils/MainApi';
import { MAX_SHORT_MOVIE_LENGTH } from '../../utils/constants';

function SavedMovies() {

    const [movies, setMovies] = useState([]);
    const [isResultBlockVisible, setIsResultBlockVisible] = useState(false);
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [film, setFilm] = useState('');
    const [resultText, setResultText] = useState('');
    const [error, setError] = useState('');
    const [checked, setChecked] = useState(false);
    
    React.useEffect(() => {
        mainApi.getMovies()
        .then((res) => {
            setMovies(res.data);
            setFilteredMovies(res.data);
        })
        .catch((error) => {
            console.log('ОШИБКА:', error);
        })
    }, [])

    React.useEffect(() => {
        if (filteredMovies.length === 0) {
            setResultText('Ничего не найдено');
            setMovies([]);
            return setIsResultBlockVisible(true);
        } else {
            setIsResultBlockVisible(false);
            if (checked) {
                const newFilmArray = filteredMovies.filter(movie => 
                    movie.duration <= MAX_SHORT_MOVIE_LENGTH);
                    if (newFilmArray.length === 0) {
                        setResultText('Ничего не найдено');
                        setMovies([]);
                        return setIsResultBlockVisible(true);
                    } else {
                        setMovies(newFilmArray)
                    }
            } else {
                setMovies(filteredMovies);
            }
        }
    }, [filteredMovies, checked])

    function onDeleteClick(card) {
        mainApi.deleteCard(card._id)
        .then((res) => {
            setFilteredMovies(filteredMovies.filter(movie => 
                movie._id !== res.data._id));
        })
        .catch((error) => {
            console.log('ОШИБКА:', error);
        })
    }

    function searchMovies() {
        setMovies([]);
        setIsResultBlockVisible(false);
        setIsPreloaderVisible(true);
        mainApi.getMovies()
        .then((res) => {
            setFilteredMovies(res.data.filter(movie => 
                movie.nameRU.toLowerCase().includes(film)))
        })
        .catch((error) => {
            setResultText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            setIsResultBlockVisible(true);
            console.log('ОШИБКА:', error);
        })
        .finally(setIsPreloaderVisible(false))
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!film) {
            return setError("Нужно ввести ключевое слово");
        } else setError('');
        searchMovies();
    }

    function handleChange(event) {
        const input = event.target;
        setFilm(input.value);
        setError('');
    }

    function changeCheckbox() {
        setChecked(!checked);
    }

    return (
        <>
            <Header headerClass="header header_page_movies">
                <Navigation />
            </Header>
            <SearchForm 
                searchMovies = {searchMovies}
                film = {film}
                handleChange = {handleChange}
                error = {error}
                handleSubmit = {handleSubmit}
                checked = {checked}
                changeCheckbox = {changeCheckbox}
            />
            <Preloader 
                isPreloaderVisible = {isPreloaderVisible}
            />
            <ResultBlock 
                isResultBlockVisible = {isResultBlockVisible}
                resultText = {resultText}
                />
            <MoviesCardList 
                displayLike="" 
                displayDelete="card__icon_display"
                movies = {movies}
                countMovies = {movies.length}
                prefix=""
                onDeleteClick = { onDeleteClick }
                savedMoviesIdArray = {[]}
            />
            <Footer />
        </>
    );
  }
  
export default SavedMovies;