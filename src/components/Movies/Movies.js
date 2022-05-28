import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import ResultBlock from '../ResultBlock/ResultBlock';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import React, { useState } from 'react';
import { SCREEN_WIDTH, MAX_SHORT_MOVIE_LENGTH } from '../../utils/constants';

function Movies() {

    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [film, setFilm] = useState('');
    const [error, setError] = useState('');
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    const [isResultBlockVisible, setIsResultBlockVisible] = useState(false);
    const [resultText, setResultText] = useState('');
    const [isButtonMoreVisible, setIsButtonMoreVisible] = useState(false);
    const [countMovies, setCountMovies] = useState(0);
    const [savedMoviesIdArray, setSavedMoviesIdArray] = useState([]);
    const [savedMoviesArray, setSavedMoviesArray] = useState([]);
    const [movieIdToDelete, setMovieIdToDelete] = useState();
    const [allMovies, setAllMovies] = useState([]);

    React.useEffect(() => {
        getSavedMovies();
    }, [])

    function getSavedMovies() {
        mainApi.getMovies()
        .then(res => {
            setSavedMoviesArray(res.data);
            setSavedMoviesIdArray(res.data.map(item => {
                return item.movieId
            }))
        })
        .catch((error) => {
            console.log('ОШИБКА:', error);
        })
    }
    
    function handleChange(event) {
        const input = event.target;
        setFilm(input.value);
        setError('');
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        if (!film) {
            return setError("Нужно ввести ключевое слово");
        } else { 
            setError('');
            setIsPreloaderVisible(true);
            setMovies([]);
            setIsResultBlockVisible(false);
            setIsButtonMoreVisible(false);
            setTimeout(() => {
                searchMovies();
            }, 2000)
        }
    }

    function changeCheckbox() {
        setChecked(!checked);
    }

    function setOrder() {
        if (window.innerWidth >= SCREEN_WIDTH.max) {
            setCountMovies(12);
        } else if (window.innerWidth >= SCREEN_WIDTH.min && window.innerWidth < SCREEN_WIDTH.max) {
            setCountMovies(8);
        } else setCountMovies(5);
    }

    React.useEffect(() => {
        moviesApi.getMovies()
            .then(res => setAllMovies(res))
            .catch((error) => {
                setResultText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                setIsResultBlockVisible(true);
                console.log('ОШИБКА:', error);
            })
        const onResize = () => {
            setTimeout(() => {
                setOrder()
            }, 2000)
        }
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [])
    
    React.useEffect(() => {
        if (localStorage.getItem('filteredMovies')) {
            setFilm(localStorage.getItem('inputData'));
            setFilteredMovies(JSON.parse(localStorage.getItem('filteredMovies')));
            setChecked(JSON.parse(localStorage.getItem('checkboxPosition')));
        } else {
            setMovies([]);
        }
        setOrder();
    }, []);
    

    React.useEffect(() => {
        if (countMovies < filteredMovies.length && countMovies < movies.length) {
            setIsButtonMoreVisible(true);
        } else {
            setIsButtonMoreVisible(false);
        }
    }, [countMovies, filteredMovies, movies])

    React.useEffect(() => {
        if (filteredMovies.length === 0) {
            setResultText('Ничего не найдено');
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
        localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
        localStorage.setItem('checkboxPosition', JSON.stringify(checked));
    }, [filteredMovies, checked])

    React.useEffect(() => {
        if (movieIdToDelete) {
            mainApi.deleteCard(movieIdToDelete[0]._id)
            .then(() => 
                console.log(`Удалена карточка`))
            .catch((error) => {
                console.log('ОШИБКА:', error);
            })
        }
    }, [movieIdToDelete])

    function searchMovies() {
        setFilteredMovies(allMovies.filter(movie => 
            movie.nameRU.toLowerCase().includes(film)))
        localStorage.setItem('inputData', film);
        setIsPreloaderVisible(false)
    }

    function onButtonMoreClick() {
        if (window.innerWidth >= SCREEN_WIDTH.max) {
            setCountMovies(countMovies + 3);
        } else {
            setCountMovies(countMovies + 2);
        }
    }

    function onLikeClick(card) {
       mainApi.addNewCard(card)
        .then(() => {
            getSavedMovies();
        }
    )
        .catch((error) => {
            console.log('ОШИБКА:', error);
        })
    }

    function onDislikeClick(card) {
        setMovieIdToDelete(savedMoviesArray.filter(movie => 
            movie.movieId === String(card.id)))
    }

    return (
        <>
            <Header headerClass = "header header_page_movies">
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
                displayDelete = "" 
                displayLike = "card__icon_display"
                movies = {movies}
                countMovies = {countMovies}
                onLikeClick = {onLikeClick}
                onDeleteClick = {onDislikeClick}
                prefix="https://api.nomoreparties.co/"
                savedMoviesIdArray = {savedMoviesIdArray}
            />
            <More 
                isButtonMoreVisible = {isButtonMoreVisible}
                onButtonMoreClick = {onButtonMoreClick}
            />
            <Footer />
        </>
    );
}
  
export default Movies;