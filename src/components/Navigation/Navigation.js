import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <>
            <div className="navigation">
                <div className="navigation__film-line">
                    <NavLink to="/movies" className="link link_decoration_none">Фильмы</NavLink>
                    <NavLink to="/saved-movies" className="link link_decoration_none">Сохраненные фильмы</NavLink>
                </div>
                <NavLink to="/profile" className="navigation__acc link link_decoration_none">Аккаунт</NavLink>
            </div>
            <div className="burger-menu">
                <input id="menu__toggle" type="checkbox" />
                <label className="menu__btn" htmlFor="menu__toggle">
                    <span></span>
                </label>
                <ul className="menu__box">
                    <li><NavLink to="/" className="menu__item link">Главная</NavLink></li>
                    <li><NavLink to="/movies" className="menu__item link">Фильмы</NavLink></li>
                    <li><NavLink to="/saved-movies" className="menu__item link">Сохраненные фильмы</NavLink></li>
                    <li><NavLink to="/profile" className="menu__item-account link link_decoration_none">Аккаунт</NavLink></li>
                </ul>
            </div>
        </>
    )
}

export default Navigation;

