import MoviesCard from '../MoviesCard/MoviesCard';
import { initialCards } from '../../utils/constants';

function MoviesCardList(props) {
    return (
        <section className="movies-cardlist">
            {
            initialCards.map(card => (
                    <MoviesCard 
                        {...card} 
                        key={card.id} 
                        displayLike={props.displayLike} 
                        displayDelete={props.displayDelete}
                    />
                )
            )
            }
        </section>
    );
  }
  
export default MoviesCardList;