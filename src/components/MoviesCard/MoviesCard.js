import React from 'react';

function MoviesCard(props) {

    const [isVisible, setIsVisible] = React.useState(false);
    const [isLiked, setIsLiked] = React.useState(false);

    React.useEffect(() => {
        props.savedMoviesIdArray.includes(String(props.cardItem.id)) && setIsLiked(true);
    }, [props.cardItem.id, props.savedMoviesIdArray])

    function makeDeleteVisibile() {
        setIsVisible(true);
    }

    function makeDeleteInvisible() {
        setIsVisible(false);
    }

    function handleLikeClick() {
        if (!isLiked) {
            setIsLiked(!isLiked);
            props.onLikeClick(props.cardItem);
        } else {
            setIsLiked(!isLiked);
            props.onDeleteClick(props.cardItem);
        }

    }

    function handleDeleteClick() {
        props.onDeleteClick(props.cardItem)
    }

    function handleImageClick() {
        window.open(`${props.trailerLink}`, '_blank')
    }
    
    const cardLikeButtonClassName = (
        `card__heart ${isLiked ? 'card__heart_filled' : '' }`
    )

    return (
        <article className="card">
            <img src={`${props.prefix}${props.image.url || props.image}`} alt={props.nameRU} className="card__image" onClick={handleImageClick}/>
            <div className="card__description" onMouseOver={makeDeleteVisibile} onMouseOut={makeDeleteInvisible}>
                <h2 className="card__title">{props.nameRU}</h2>
                <button type="button" className={`${props.displayLike} ${cardLikeButtonClassName}`} onClick={handleLikeClick} />
                <button type="button" className={`card__delete ${isVisible ? props.displayDelete : ""}`} onClick={handleDeleteClick} />
            </div>
            <p className="card__film-length">{`${Math.floor(props.duration / 60) > 0 ? `${Math.floor(props.duration / 60)}ч` : ""} ${props.duration % 60}м`}</p>
        </article>
    );
  }
  
export default MoviesCard;