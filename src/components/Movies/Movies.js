import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
//import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

function Movies() {

    return (
        <>
            <Header headerClass="header header_page_movies">
                <Navigation />
            </Header>
            <SearchForm />
            {/*<Preloader />*/}
            <MoviesCardList displayDelete="" displayLike="card__icon_display"/>
            <More />
            <Footer />
        </>
    );
}
  
export default Movies;