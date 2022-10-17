import React, { useState, useEffect } from 'react';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateUser = (newUserData) => {
    api.editProfile(newUserData.name, newUserData.about)
      .then((userData) => {
        setCurrentUser(userData);
        setEditProfilePopupOpen(false);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  };

  const handleUpdateAvatar = (newAvatarData, avatarRef) => {
    api.updateAvatar(newAvatarData)
      .then((userData) => {
        setCurrentUser(userData);
        setEditAvatarPopupOpen(false);
        avatarRef.current.value = '';
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  };

  const handleAddCard = (cardName, cardLink, cardTitleRef, cardLinkRef) => {
    api.addNewCard(cardName, cardLink)
      .then((cardData) => {
        setCards([cardData, ...cards]); 
        setAddPlacePopupOpen(false);
        cardTitleRef.current.value = '';
        cardLinkRef.current.value = '';
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  const handleCardLike = (card) => {
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

  const handleCardDelete = (card) => {
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

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }, []);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditProfile={() => setEditProfilePopupOpen(true)}
          onAddPlace={() => setAddPlacePopupOpen(true)}
          onEditAvatar={() => setEditAvatarPopupOpen(true)}
          onCardImage={(card) => handleCardClick(card)}
        />

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={() => setEditProfilePopupOpen(false)} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={() => setAddPlacePopupOpen(false)} onAddCard={handleAddCard} />
        
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={() => setEditAvatarPopupOpen(false)} onUpdateAvatar={handleUpdateAvatar} />

        <PopupWithForm
          name='delete-card'
          title='Вы уверены?'
          formName='deleteCard'
          btnText='Да'
        />

        <ImagePopup
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
