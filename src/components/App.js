import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className="App">
      <Header />

      <Main
        onEditProfile={() => setEditProfilePopupOpen(true)}
        onAddPlace={() => setAddPlacePopupOpen(true)}
        onEditAvatar={() => setEditAvatarPopupOpen(true)}
        onCardImage={(card) => handleCardClick(card)}
      />

      <Footer />

      <PopupWithForm
        name='edit-profile'
        title='Редактировать профиль'
        formName='info'
        btnText='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={() => setEditProfilePopupOpen(false)}>
        <input
          required
          id="name-input"
          type="text"
          className="popup__input popup__input_type_name"
          name="name"
          defaultValue="Жак-Ив Кусто"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
        />
        <p className="popup__error name-input-error"></p>
        <input
          required
          id="status-input"
          type="text"
          className="popup__input popup__input_type_status"
          name="status"
          defaultValue="Исследователь океана"
          minLength="2"
          maxLength="200"
          placeholder="Статус"
        />
        <p className="popup__error status-input-error"></p>
      </PopupWithForm>

      <PopupWithForm
        name='add-profile'
        title='Новое место'
        formName='place'
        btnText='Сохранить'
        isOpen={isAddPlacePopupOpen}
        onClose={() => setAddPlacePopupOpen(false)}>
        <input
          required
          id="title-input"
          type="text"
          className="popup__input popup__input_type_title"
          name="title"
          placeholder="Название"
          minLength="2"
          maxLength="30" 
        />
        <p className="popup__error title-input-error"></p>
        <input
          required
          id="link-input"
          type="url"
          className="popup__input popup__input_type_link"
          name="link"
          placeholder="Ссылка на картинку" 
        />
        <p className="popup__error link-input-error"></p>
      </PopupWithForm>

      <PopupWithForm
        name='edit-avatar'
        title='Обновить аватар'
        formName='avatar'
        btnText='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={() => setEditAvatarPopupOpen(false)}>
        <input
          required
          id="avatar-input"
          type="url"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Ссылка на аватар" 
        />
        <p className="popup__error avatar-input-error"></p>
      </PopupWithForm>

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
    </div>
  );
}

export default App;
