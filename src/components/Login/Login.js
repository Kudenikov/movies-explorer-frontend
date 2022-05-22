import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';
import { useEffect } from 'react';

function Login(props) {

    const navigate = useNavigate();

    useEffect(()=>{
        if (props.loggedIn){
          navigate('/movies');
        }

      }, [props.loggedIn, navigate])

    return (
        <Auth 
            title="Рады видеть!"
            buttonText="Войти"
            text="Ещё не зарегистрированы?"
            linkText="Регистрация"
            link="/signup"
            addVertMargin="login__margin"
            email={props.email}
            password={props.password}
            isNameValid={true}
            isEmailValid={props.isEmailValid}
            isPasswordValid={props.isPasswordValid}
            emailInputError={props.emailInputError}
            passwordInputError={props.passwordInputError}
            handleEmailChange={props.handleEmailChange}
            handlePasswordChange={props.handlePasswordChange}
            handleSubmit={props.handleSubmit}
            submitError={props.submitError}
        >
        </Auth>
    )
}
  
export default Login;