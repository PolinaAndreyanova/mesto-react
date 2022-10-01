function PopupWithForm(props) {
  return(
    <div className={`popup popup_type_${props.name}${props.isOpen ? ' popup_opened' : ''}`} >
      <div className="popup__content">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form method="get" name={props.formName} className="popup__form" noValidate>
          {props.inputs.map((item, index) => (
            <div key={index}>
              <input 
                required 
                id={`${item.inputId}-input`} 
                type={item.type} 
                className={`popup__input popup__input_type_${item.inputId}`}
                name={`${item.inputId}`}
                defaultValue={`${item.value}`} 
                minLength={`${item.minLength}`}
                maxLength={`${item.maxLength}`}
                placeholder={`${item.placeholder}`}
              />
              <p className={`popup__error ${item.inputId}-input-error`}></p>
            </div>
          ))}
          <button type="submit" className="popup__submit-button popup__submit-button_disabled">{props.btnText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;