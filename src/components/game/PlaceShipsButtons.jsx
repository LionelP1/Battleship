import React from 'react';
import '../../styles/placeshipbuttons.css';

const PlaceShipsButtons = ({ orientation, setOrientation }) => {

  const toggleOrientation = () => {
    setOrientation((prevOrientation) => 
    prevOrientation === 'h' ? 'v' : 'h' );
  };

  return (
    <div className="button-grid">
      <button className="orientation-btn" onClick={toggleOrientation}>
        {orientation === 'h' ? 'Vertical ↕' : 'Horizontal ↔'}
      </button>

      <button className="clear-btn">Clear</button>
      <button className="start-btn">Start</button>
    </div>
  );
};

export default PlaceShipsButtons;
