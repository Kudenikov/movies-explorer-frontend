import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Header(props) {

    const navigate = useNavigate();

    function handleClick() {
        navigate('/');
    }

    return (
        <header className={props.headerClass}>
            <img className="header__logo" src={logo} alt="Логотип" onClick={handleClick} />
            {props.children}
        </header>
    );
  }
  
export default Header;