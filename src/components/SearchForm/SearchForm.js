import searchPic from '../../images/icon-search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
        <section className="search-form">
            <form className="search-form__form">
                <div className="search-form__string">
                    <img src={searchPic} alt="Поиск" className="search-form__pic"/>
                    <input className="search-form__input" placeholder="Фильм" required/>
                    <button type="submit" className="search-form__button link"/>
                </div>
                <div className="search-form__vertical-line"></div>
                <div className="search-form__short-movies">
                    <FilterCheckbox />
                    <div className="search-form__checkbox-label">Короткометражки</div>
                </div>
            </form>
            <div className="search-form__underline" />
        </section>
    );
  }
  
export default SearchForm;