import { useState, useContext, useEffect } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {

    const currentUser = useContext(CurrentUserContext);

    const [isVisible, setIsVisible] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState(currentUser.name);
    const [isNameValid, setIsNameValid] = useState(true);
    const [nameInputError, setNameInputError] = useState('');
    const [email, setEmail] = useState(currentUser.email);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [emailInputError, setEmailInputError] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    useEffect(() => {
        if (name !== currentUser.name || email !== currentUser.email) {
            console.log(name, currentUser.name);
            if (isEmailValid && isNameValid) {
                setIsActive(true);
            } else {
                setIsActive(false);
            } 
        } else {setIsActive(false)}
      }, [isEmailValid, isNameValid, name, email, currentUser])
    
    function handleNameChange(event) {
        if (isVisible) {
            return
        }
        props.setSubmitError('');
        const input = event.target;
        setName(input.value);
        setIsNameValid(input.validity.valid);
        setNameInputError(input.validationMessage);
        const regex = /[^a-zа-яё -]/iu;
        if (regex.test(input.value)) {
            setIsNameValid(false);
            setNameInputError('Допускается только латиница, кириллица, пробел или дефис');
        } else {
          setIsNameValid(input.validity.valid);
          setNameInputError(input.validationMessage);
        }
    }

    function handleEmailChange(e) {
        if (isVisible) {
            return
        }
        props.setSubmitError('');
        const input = e.target;
        setEmail(input.value);
        const regex = /.+@.+\..+/i;
        if (!regex.test(input.value)) {
          setIsEmailValid(false);
          setEmailInputError('Некорректный адрес электронной почты');
        } else { 
          setEmailInputError('');
          setIsEmailValid(true);
        }
    }

    function updateProfile(e) {
        e.preventDefault();
        if (!isVisible && isActive) {
            props.updateUser({name, email})
        }
    }

    function clickHandler() {
        setIsVisible(false);
        props.setSubmitError('');
    }

    return (
        <section className="profile">
            <Header headerClass="header header_page_movies">
                <Navigation />
            </Header>
            <h2 className="profile__title">{`Привет, ${currentUser.name}`}</h2>
            <form className="profile__data" onSubmit={updateProfile} noValidate>
                <div className="profile__textblock">
                    <p className="profile__text">Имя</p>
                    <input 
                        type="text" 
                        className="profile__input" 
                        value={name || ''} 
                        onChange={handleNameChange} 
                        required 
                    />
                    <span className="profile__input-error">{nameInputError}</span>
                </div>
                <div className="profile__underline"></div>
                <div className="profile__textblock">
                    <p className="profile__text">E-mail</p>
                    <input 
                        type="email" 
                        className="profile__input" 
                        value={email || ''} 
                        onChange={handleEmailChange} 
                        required
                    />
                    <span className="profile__input-error">{emailInputError}</span>
                </div>
                <button 
                    type="button" 
                    className={`${isVisible ? "profile__edit link" : "profile__button_visibility_none"}`} 
                    onClick={clickHandler}>
                        Редактировать
                </button>
                <button 
                    type="button" 
                    className={`${isVisible ? "profile__exit link" : "profile__button_visibility_none"}`}
                    onClick={props.exitFromAccount}>
                        Выйти из аккаунта
                </button>
                <span className={`${!isVisible ? "profile__submit-error" : "profile__button_visibility_none"}`}>{props.submitError}</span>
                <button 
                    type="submit" 
                    className={`${isVisible ? "profile__button_visibility_none" : `profile__save link ${!isActive && "profile__button_disabled"}`}`}
                >
                        Сохранить
                </button>
            </form>
        </section>
    );
  }
  
export default Profile;