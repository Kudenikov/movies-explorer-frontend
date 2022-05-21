import Auth from '../Auth/Auth';

function Register(props) {

    return (
        <Auth 
            title="Добро пожаловать!"
            buttonText="Зарегистрироваться"
            text="Уже зарегистрированы?"
            linkText="Войти"
            link="/signin"
            addVertMargin=""
            email={props.email}
            password={props.password}
            isNameValid={props.isNameValid}
            isEmailValid={props.isEmailValid}
            isPasswordValid={props.isPasswordValid}
            emailInputError={props.emailInputError}
            passwordInputError={props.passwordInputError}
            handleEmailChange={props.handleEmailChange}
            handlePasswordChange={props.handlePasswordChange}
            handleSubmit={props.handleSubmit}
            submitError={props.submitError}
        >
            <label className="auth__label">Имя
                <input 
                    id="name-input"
                    name="name" 
                    type="text" 
                    className="auth__input" 
                    required
                    value={props.name}
                    onChange={props.handleNameChange}
                />
                <span className="auth__input-error">{props.nameInputError}</span>
            </label>
        </Auth>
    )
}
  
export default Register;