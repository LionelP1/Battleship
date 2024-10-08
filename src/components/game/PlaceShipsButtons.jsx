import React from 'react';
import '../../styles/placeshipbuttons.css';

const PlaceShipsButtons = ({ orientation, setOrientation, handleClear, allShipsPlaced, handleStart }) => {

  const toggleOrientation = () => {
    setOrientation((prevOrientation) => 
    prevOrientation === 'h' ? 'v' : 'h' );
  };

  return (
    <div className="button-grid">
      <h2 className="button-grid-title">Buttons</h2>
      <button className="orientation-btn" onClick={toggleOrientation}>
        {orientation === 'h' ? 'Horizontal ↔' : 'Vertical ↕'}
      </button>

      <button className="clear-btn" onClick={handleClear}>Clear</button>
      
      <button 
        className="start-btn" 
        disabled={!allShipsPlaced} 
        onClick={handleStart}>
          Start
      </button>
    </div>
  );
};

export default PlaceShipsButtons;
