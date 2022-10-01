function Card(props) {
  const handleClick = () => { props.onCardClick(props) }; 

  return(
    <article className="card">
      <img className="card__image" src={props.link} onClick={handleClick}/>
      <div className="card__information">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__like">
          <button type="button" className="card__like-button"></button>
          <p className="card__like-count">{props.likes}</p>
        </div>
      </div>
      <button type="button" className="card__trash-button" disabled></button>
    </article>
  );
}

export default Card;