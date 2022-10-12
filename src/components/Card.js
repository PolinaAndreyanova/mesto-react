import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const handleClick = () => { props.onCardClick(props) }; 

  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.owner._id === currentUser._id;

  const isLiked = props.likes.some(i => i._id === currentUser._id);

  return(
    <article className="card">
      <img className="card__image" src={props.link} alt={props.name} onClick={handleClick}/>
      <div className="card__information">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__like">
          <button type="button" className={`card__like-button${isLiked && ' card__like-button_active'}`}></button>
          <p className="card__like-count">{props.likes.length}</p>
        </div>
      </div>
      <button type="button" className="card__trash-button" disabled={!isOwn && 'disabled'} style={isOwn ? {visibility: 'visible'} : {}}></button>
    </article>
  );
}

export default Card;