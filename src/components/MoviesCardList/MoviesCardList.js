import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

    return (
        <section className="movies-cardlist">
            {
            props.movies.slice(0, props.countMovies).map(card => {
                return (
                    <MoviesCard 
                        {...card} 
                        key={card.id || card._id} 
                        displayLike={props.displayLike} 
                        displayDelete={props.displayDelete}
                        onLikeClick={props.onLikeClick}
                        cardItem={card}
                        prefix={props.prefix}
                        onDeleteClick = { props.onDeleteClick }
                        savedMoviesIdArray = { props.savedMoviesIdArray }
                    />
                )
                })
            }
        </section>
    );
  }
  
export default MoviesCardList;