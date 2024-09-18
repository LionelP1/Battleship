import React from 'react';
import '../styles/popup.css';


const Popup = ({ message, onClose, picture}) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="title">{message}</h2>
        <p className="emoji-pic">{picture}</p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;