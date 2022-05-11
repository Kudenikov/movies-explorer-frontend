import Auth from '../Auth/Auth';

function Login() {

    return (
        <Auth 
            title="Рады видеть!"
            buttonText="Войти"
            text="Ещё не зарегистрированы?"
            linkText="Регистрация"
            link="/signup"
            addVertMargin="login__margin"
        >
        </Auth>
    )
}
  
export default Login;