import Auth from '../Auth/Auth';

function Register() {

    function onChange() {}

    return (
        <Auth 
            title="Добро пожаловать!"
            buttonText="Зарегистрироваться"
            text="Уже зарегистрированы?"
            linkText="Войти"
            link="/signin"
            addVertMargin=""
        >
            <label className="auth__label">Имя
                <input 
                    id="name-input"
                    name="name" 
                    type="text" 
                    className="auth__input" 
                    required
                    value="Артём"
                    onChange={onChange}
                />
            </label>
        </Auth>
    )
}
  
export default Register;