import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../../utils/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [nameInputError, setNameInputError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [emailInputError, setEmailInputError] = useState('');
  const [passwordInputError, setPasswordInputError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isUserChecked, setIsUserChecked] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isRegistered) {
      mainApi.authorize(email, password)
      .then((data) => {
          localStorage.setItem('jwt', data.jwt);
          mainApi["token"] = `Bearer ${localStorage.getItem('jwt')}`;
          setLoggedIn(true);
          setName('');
          setEmail('');
          setPassword('');
          navigate('/movies');
        })
      .catch((error) => {
          console.log('ОШИБКА:', error);
      })
      setIsRegistered(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegistered, email, password])

  useEffect(() => {
      const jwt = localStorage.getItem('jwt') || '';
      mainApi.checkToken(jwt)
      .then((res) => {
        if (res.data) {
          setLoggedIn(true);
          setCurrentUser(res.data);
          setIsUserChecked(true);
        }
      })
      .catch((error) => {
        setIsUserChecked(true);
        console.log('ОШИБКА:', error);
      }
    )}
, []);

  function handleEmailChange(e) {
    setSubmitError('');
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

  function handlePasswordChange(e) {
      setSubmitError('');
      const input = e.target;
      setPassword(input.value);
      setIsPasswordValid(input.validity.valid);
      setPasswordInputError(input.validationMessage);
  }
  
  function handleNameChange(event) {
    setSubmitError('');
    const input = event.target;
    setName(input.value);
    const regex = /[^a-zа-яё -]/iu;
    if (regex.test(input.value)) {
        setIsNameValid(false);
        setNameInputError('Допускается только латиница, кириллица, пробел или дефис');
    } else {
      setIsNameValid(input.validity.valid);
      setNameInputError(input.validationMessage);
    }
  }

  function handleRegister() {
    mainApi.register(name, email, password)
    .then(() => { 
      setIsRegistered(true)
    })
    .catch((error) => {
        setSubmitError(error);
        console.log('ОШИБКА:', error);
    })
  }

  function handleLogin() {
    mainApi.authorize(email, password)
    .then((data) => {
        localStorage.setItem('jwt', data.jwt);
        mainApi["token"] = `Bearer ${localStorage.getItem('jwt')}`;
        setLoggedIn(true);
        setEmail('');
        setPassword('');
      })
    .catch((error) => {
        setSubmitError(`Вход не выполнен. ${error}`);
        console.log('ОШИБКА:', error);
    })
  }

  function handleExitButton() {
    setIsEmailValid(false);
    setIsNameValid(false);
    setIsPasswordValid(false);
    setLoggedIn(false);
    setSubmitError('');
    localStorage.removeItem('jwt');
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('inputData');
    localStorage.removeItem('checkboxPosition');
    navigate("/");
  }

  function updateUser(user) {
    mainApi.updateUserInfo(user)
    .then(res => {
      setCurrentUser(res.data);
      setSubmitError('Данные пользователя обновлены.')
    })
    .catch((error) => {
        setSubmitError(`При обновлении пользователя произошла ${error}`);
        console.log('ОШИБКА:', error);
    })
  }

  return (
    <>
    {isUserChecked ? 
            <Routes>
            <Route path="/" element={
              <Main 
                loggedIn={loggedIn}
              />  
            }/>
    
            <Route path="/movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies />
              </ProtectedRoute>
            }/>
      
            <Route path="/saved-movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies />
              </ProtectedRoute>
            }/>
      
            <Route path="/profile" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <CurrentUserContext.Provider value={currentUser}>
                  <Profile 
                    exitFromAccount={handleExitButton}
                    updateUser={updateUser}
                    submitError={submitError}
                    setSubmitError={setSubmitError}
                  />
                </CurrentUserContext.Provider>
              </ProtectedRoute>
            }/>
      
            <Route path="/signup" element={
              <Register 
                handleSubmit={handleRegister}
                handleNameChange={handleNameChange}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
                name={name}
                setName={setName}
                email={email}
                password={password}
                isNameValid={isNameValid}
                isEmailValid={isEmailValid}
                isPasswordValid={isPasswordValid}
                nameInputError={nameInputError}
                emailInputError={emailInputError}
                passwordInputError={passwordInputError}
                submitError={submitError}
                loggedIn={loggedIn}
              />  
            }/>
      
            <Route path="/signin" element={
              <Login 
                handleSubmit={handleLogin}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
                email={email}
                password={password}
                isEmailValid={isEmailValid}
                isPasswordValid={isPasswordValid}
                emailInputError={emailInputError}
                passwordInputError={passwordInputError}
                submitError={submitError}
                loggedIn={loggedIn}
              />  
            }/>
      
            <Route path="/*" element={
              <PageNotFound />  
            }/>
          </Routes>
  : null}

      </>
      )
}

export default App;
