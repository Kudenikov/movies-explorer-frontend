import React from 'react';

function MoviesCard(props) {

    const [isLiked, setIsLiked] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);

    function makeDeleteVisibile() {
        setIsVisible(true);
    }

    function makeDeleteInvisible() {
        setIsVisible(false);
    }

    function handleLikeClick() {
        setIsLiked(!isLiked);
    }

    function handleDeleteClick() {

    }
    
    const cardLikeButtonClassName = (
        `card__heart ${isLiked ? 'card__heart_filled' : ''}`
    )

    return (
        <article className="card">
            <img src={props.link} alt={props.name} className="card__image"/>
            <div className="card__description" onMouseOver={makeDeleteVisibile} onMouseOut={makeDeleteInvisible}>
                <h2 className="card__title">{props.name}</h2>
                <button type="button" className={`${cardLikeButtonClassName} ${props.displayLike}`} onClick={handleLikeClick} />
                <button type="button" className={`card__delete ${isVisible ? props.displayDelete : ""}`} onClick={handleDeleteClick} />
            </div>
            <p className="card__film-length">{props.length}</p>
        </article>
    );
  }
  
export default MoviesCard;