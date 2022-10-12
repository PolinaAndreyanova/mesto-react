import React, {useState, useEffect, useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [cards, setCards] = useState([]);

  const currentUser = useContext(CurrentUserContext);

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
            name={card.name} 
            link={card.link} 
            owner={card.owner}
            likes={card.likes}
            onCardClick={props.onCardImage}
          />) )}
      </section>
    </main>
  );
}

export default Main;