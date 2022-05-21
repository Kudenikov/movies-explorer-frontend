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
  
  const navigate = useNavigate();

  useEffect(()=>{
    if (loggedIn){
      navigate('/movies');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])
  
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
        })
      .catch((error) => {
          console.log('ОШИБКА:', error);
      })
      setIsRegistered(false);
    }
  }, [isRegistered, email, password])

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      // проверяем токен пользователя
      mainApi.checkToken(jwt).then((res) => {
        if (res.data) {
          setLoggedIn(true);
          setCurrentUser(res.data);
        }
      })
      .catch(error => 
        console.log('ОШИБКА:', error))
    }
  }, [loggedIn]);

  function handleEmailChange(e) {
    setSubmitError('');
    const input = e.target;
    setEmail(input.value);
    setIsEmailValid(input.validity.valid);
    setEmailInputError(input.validationMessage);
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
    setIsNameValid(input.validity.valid);
    setNameInputError(input.validationMessage);
    const regex = /[^a-zа-яё -]/iu;
    if (regex.test(input.value)) {
        setNameInputError('Допускается только латиница, кириллица, пробел или дефис');
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
    navigate("/signin");
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
    <Routes>
      <Route path="/" element={
        <Main />  
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
        />  
      }/>

      <Route path="/*" element={
        <PageNotFound />  
      }/>
    </Routes>
  )
}

export default App;
