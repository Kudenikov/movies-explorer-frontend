import { useNavigate } from 'react-router-dom';

function PageNotFound() {

    const navigate = useNavigate();
    
    function clickHandler() {
        navigate(-1);
    }

    return (
        <section className="page-not-found">
            <h2 className="page-not-found__title">404</h2>
            <p className="page-not-found__text">Страница не найдена</p>
            <button 
                type="button" 
                className="link link_decoration_none page-not-found__link"
                onClick={clickHandler}
            >
                Назад
            </button>
        </section>
    );
  }
  
export default PageNotFound;