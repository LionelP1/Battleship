import React from 'react';
import shipConfig from '../../config/shipConfig';
import '../../styles/shipbuttons.css';

const ShipButtons = ({ selectedShip, setSelectedShip }) => {
  return (
    <div className="ship-grid">
      {shipConfig.map((ship) => (
        <div
          key={ship.id}
          className={`ship-container ${selectedShip === ship.id ? 'selected' : ''}`}
          onClick={() => setSelectedShip(ship.id)}
        >
          <div className="ship">
            {renderShipSquares(ship.length)}
          </div>
          <div className="ship-count">x {ship.count}</div>
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
