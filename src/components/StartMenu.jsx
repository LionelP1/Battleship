import React from 'react';
import '../styles/startmenu.css';
const StartMenu = ({ onStart }) => {
  return (
    <div className="start-menu">
      <h1 className="start-title">Battleship</h1>
      <h3 className="sub-title">The Ultimate Naval Warfare Experience</h3>
      <button onClick={onStart} className="start-button">Start Game</button>
    </div>
  );
};

export default StartMenu;