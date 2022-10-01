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
        inputs={[
          {
            inputId: 'name',
            type: 'text',
            value: 'Жак-Ив Кусто',
            minLength: '2',
            maxLength: '40',
            placeholder: 'Имя',
          },
          {
            inputId: 'status',
            type: 'text',
            value: 'Исследователь океана',
            minLength: '2',
            maxLength: '200',
            placeholder: 'Статус',
          }]}
        btnText='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={() => setEditProfilePopupOpen(false)}
      />

      <PopupWithForm 
        name='add-profile' 
        title='Новое место' 
        formName='place'
        inputs={[
          {
            inputId: 'title',
            type: 'text',
            value: '',
            minLength: '2',
            maxLength: '30',
            placeholder: 'Название',
          },
          {
            inputId: 'link',
            type: 'url',
            value: '',
            minLength: '',
            maxLength: '',
            placeholder: 'Ссылка на картинку',
          }]}
        btnText='Сохранить'
        isOpen={isAddPlacePopupOpen}
        onClose={() => setAddPlacePopupOpen(false)}
      />

      <PopupWithForm 
        name='edit-avatar' 
        title='Обновить аватар' 
        formName='avatar'
        inputs={[
          {
            inputId: 'avatar',
            type: 'url',
            value: '',
            minLength: '',
            maxLength: '',
            placeholder: 'Ссылка на аватар',
          }]}
        btnText='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={() => setEditAvatarPopupOpen(false)}
      />

      <PopupWithForm 
        name='delete-card' 
        title='Вы уверены?' 
        formName='deleteCard'
        inputs={[]}
        btnText='Да'
      />
      
      {selectedCard ? 
        <ImagePopup
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        /> : null
      }
    </div>
  );
}

export default App;
