import React from 'react';
import shipConfig from '../../config/shipConfig';
import '../../styles/shipbuttons.css';

const ShipButtons = ({ selectedShip, setSelectedShip, availableShips }) => {
  return (
    <div className="ship-grid">
      <h3 className="ship-button-title">SHIPS</h3>
      {shipConfig.map((ship) => (
        <div
          key={ship.id}
          className={`ship-container ${selectedShip && (selectedShip.id === ship.id) ? 'selected' : ''}`}
          onClick={() => setSelectedShip(ship)}
        >
          <div className="ship">
            {renderShipSquares(ship.length)}
          </div>
          <div className="ship-count">x {availableShips[ship.id]}</div>
        </div>
      ))}
    </div>
  );
};

const renderShipSquares = (length) => {
  const squares = [];
  for (let i = 0; i < length; i++) {
    squares.push(<div key={i} className="ship-square"></div>);
  }
  return squares;
};

export default ShipButtons;
