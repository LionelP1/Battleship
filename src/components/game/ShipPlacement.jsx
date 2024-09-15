import React, { useState } from 'react';
import ShipButtons from './ShipButtons';
import '../../styles/shipbuttons.css';

const ShipPlacement = () => {
  const [selectedShip, setSelectedShip] = useState(null);

  return (
    <div className="ship-placement">
      <ShipButtons selectedShip={selectedShip} setSelectedShip={setSelectedShip} />
      <div>{selectedShip}</div>
    </div>
  );
};

export default ShipPlacement;