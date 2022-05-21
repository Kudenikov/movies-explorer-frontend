import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../../images/logo.svg';

function Auth(props) {

    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (props.isEmailValid && props.isPasswordValid && props.isNameValid) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
      }, [props.isEmailValid, props.isPasswordValid, props.isNameValid])

    function handleClick() {
        navigate('/');
    }

    function submitHandler(e) {
        e.preventDefault();
        if (isActive) {
            props.handleSubmit();
        }
    }

    return (
        <section className="auth">
            <img className="auth__logo" src={logo} alt="Логотип" onClick={handleClick} />
            <h2 className="auth__title">{props.title}</h2>
            <form className="auth__form" onSubmit={submitHandler} noValidate>
                {props.children}
                <label className="auth__label">E-mail
                    <input 
                        id="email-input"
                        name="email" 
                        type="email" 
                        className="auth__input" 
                        required
                        value={props.email}
                        onChange={props.handleEmailChange}
                    />
                    <span className="auth__input-error">{props.emailInputError}</span>
                </label>
                <label className="auth__label">Пароль
                    <input 
                        id="password-input"
                        name="password"
                        type="password" 
                        className="auth__input" 
                        required 
                        minLength="6" 
                        maxLength="12"
                        value={props.password}
                        onChange={props.handlePasswordChange}
                    />
                    <span className="auth__input-error">{props.passwordInputError}</span>
                </label>
                <span className="auth__submit-error">{props.submitError}</span>
                <button className={`auth__button ${props.addVertMargin} ${!isActive && "auth__button_disabled"}`} type="submit" >{props.buttonText}</button>
                <div className="auth__done">
                    <p className="auth__text">{props.text}</p>
                    <Link className="link link_decoration_none auth__link" to={props.link}>{props.linkText}</Link>
                </div>
            </form>
        </section>
    );
  }
  
export default Auth;