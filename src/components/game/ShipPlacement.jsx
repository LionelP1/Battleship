import React, { useState } from 'react';
import ShipButtons from './ShipButtons';
import PlaceShipsButtons from './PlaceShipsButtons';
// import '../../styles/shipplacement.css';

const ShipPlacement = () => {
  const [selectedShip, setSelectedShip] = useState(null);
  const [orientation, setOrientation] = useState('h');

  return (
    <div className="ship-placement">
      <ShipButtons selectedShip={selectedShip} setSelectedShip={setSelectedShip} />
      
      <PlaceShipsButtons orientation={orientation} setOrientation={setOrientation} />
      
      <div className="info">
        <p>Selected Ship: {selectedShip}</p>
        <p>Orientation: {orientation}</p>
      </div>
    </div>
  );
};

export default ShipPlacement;
