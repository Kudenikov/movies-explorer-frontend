import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main() {
    return (
        <>
            <Header headerClass="header">
                <div className="header__text-line">
                    <Link to="/signup" className="header__register link link_decoration_none">Регистрация</Link>
                    <Link to="/signin"><button type="button" className="header__login link">Войти</button></Link>
                </div>
            </Header>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer />
        </>
    );
  }
  
export default Main;