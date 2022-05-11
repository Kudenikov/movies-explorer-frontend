import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

function Profile() {

    const navigate = useNavigate();

    function handleChange() {

    }

    function exitFromAccount() {
        navigate('/signin');
    }

    const [isVisible, setIsVisible] = useState(true);

    function clickHandler() {
        setIsVisible(false);
    }

    return (
        <section className="profile">
            <Header headerClass="header header_page_movies">
                <Navigation />
            </Header>
            <h2 className="profile__title">{`Привет, Артём`}</h2>
            <form className="profole__data">
                <div className="profile__textblock">
                    <p className="profile__text">Имя</p>
                    <input className="profile__input" value='Артем' onChange={handleChange}/>
                </div>
                <div className="profile__underline"></div>
                <div className="profile__textblock">
                    <p className="profile__text">E-mail</p>
                    <input className="profile__input" value='kudenikov@gmail.com' onChange={handleChange}/>
                </div>
            </form>
            <button 
                type="button" 
                className={`${isVisible ? "profile__edit link" : "profile__button_visibility_none"}`} 
                onClick={clickHandler}>
                    Редактировать
            </button>
            <button 
                type="button" 
                className={`${isVisible ? "profile__exit link" : "profile__button_visibility_none"}`}
                onClick={exitFromAccount}>
                    Выйти из аккаунта
            </button>
            <button 
                type="submit" 
                className={`${isVisible ? "profile__button_visibility_none" : "profile__save link"}`}>
                    Сохранить
            </button>
        </section>
    );
  }
  
export default Profile;