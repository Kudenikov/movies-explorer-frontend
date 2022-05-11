import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

function SavedMovies() {

    return (
        <>
            <Header headerClass="header header_page_movies">
                <Navigation />
            </Header>
            <SearchForm />
            <MoviesCardList 
                displayLike="" 
                displayDelete="card__icon_display"
            />
            <More />
            <Footer />
        </>
    );
  }
  
export default SavedMovies;