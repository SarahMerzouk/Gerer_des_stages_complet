import React from 'react';
import './css/CustomAlert.css';

function CustomAlert(props) {
  const handleClick = () => {
    props.onClose();
  };

  return (
    <div className={`custom-alert ${props.show ? 'show' : ''}`}>
      <div className="custom-alert-content">
        <h3 className="custom-alert-title">{props.title}</h3>
        <p className="custom-alert-message">{props.message}</p>
        <button className="custom-alert-button" onClick={handleClick}>
          Fermer
        </button>
      </div>
    </div>
  );
}

export default CustomAlert;