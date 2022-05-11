import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Auth(props) {

    const navigate = useNavigate();

    function handleClick() {
        navigate('/');
    }

    function submitHandler() {}

    function onChange() {}

    return (
        <section className="auth">
            <img className="auth__logo" src={logo} alt="Логотип" onClick={handleClick} />
            <h2 className="auth__title">{props.title}</h2>
            <form className="auth__form" onSubmit={submitHandler}>
                {props.children}
                <label className="auth__label">E-mail
                    <input 
                        id="email-input"
                        name="email" 
                        type="email" 
                        className="auth__input" 
                        required
                        value="kudenikov@gmail.com"
                        onChange={onChange}
                    />
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
                        value="123456"
                        onChange={onChange}
                    />
                </label>
                <span className="auth__input-error">Что-то пошло не так...</span>
                <button className={`auth__button ${props.addVertMargin}`} type="submit">{props.buttonText}</button>
                <div className="auth__done">
                    <p className="auth__text">{props.text}</p>
                    <Link className="link link_decoration_none auth__link" to={props.link}>{props.linkText}</Link>
                </div>
            </form>
        </section>
    );
  }
  
export default Auth;