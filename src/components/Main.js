import React, {useState, useEffect, useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [cards, setCards] = useState([]);

  const currentUser = useContext(CurrentUserContext);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    (!isLiked) ?
      api.likeCard(card._id)
        .then((newCard) => {
          setCards(cards.map(c => c._id === newCard._id ? newCard : c))
        })
        .catch(err => console.log(`Ошибка: ${err}`)) :

      api.cancelLikeCard(card._id)
        .then((newCard) => {
          setCards(cards.map(c => c._id === newCard._id ? newCard : c))
        })
        .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id))
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  useEffect(() => {
    api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-content">
          <button type="button" className="profile__avatar-edit-button" onClick={props.onEditAvatar}></button>
          <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__status">{currentUser.about}</p>
          <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>

      <section className="cards">
        {cards.map((card) => (
          <Card 
            key={card._id} 
            _id={card._id}
            name={card.name} 
            link={card.link} 
            owner={card.owner}
            likes={card.likes}
            onCardClick={props.onCardImage}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />) )}
      </section>
    </main>
  );
}

export default Main;