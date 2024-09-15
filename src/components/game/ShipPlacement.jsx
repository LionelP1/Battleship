import React, { useState } from 'react';
import ShipButtons from './ShipButtons';
import PlaceShipsButtons from './PlaceShipsButtons';
import shipConfig from '../../config/shipConfig';
import Player from '../../factories/playerFactory';
import Grid from './Grid';
// import '../../styles/shipplacement.css';

const ShipPlacement = () => {
  const [selectedShip, setSelectedShip] = useState(null);
  const [orientation, setOrientation] = useState('h');
  const [availableShips, setAvailableShips] = useState(() => {
    // Will create an object in this form: {0: 1, 1: 1, 2: 2,} from config
    const initialShips = {};
    shipConfig.forEach(ship => {
      initialShips[ship.id] = ship.count;
    });
    return initialShips;
  });

  let player = new Player();
  const [boardState, setBoardState] = useState([player.gameboard.board]);

  const handlePlaceShip = (x, y) => {
		//Check you selected ship and didnt place them all
    if (selectedShip && availableShips[selectedShip] > 0) {
			//Check the placement on the grid of the ship is valid
      const success = player.placeShip(selectedShip, x, y, orientation);
      if (success) {
        setAvailableShips((prev) => ({
          ...prev,
          [selectedShip]: prev[selectedShip] - 1,
        }));
        setBoardState([...player.gameboard.board]);
      }
    }
  };

  return (
    <div className="ship-placement">
      <ShipButtons selectedShip={selectedShip} setSelectedShip={setSelectedShip} />
      <PlaceShipsButtons orientation={orientation} setOrientation={setOrientation} />

      <Grid player={player} onClick={handlePlaceShip} />

      <div className="info">
        <p>Selected Ship: {selectedShip}</p>
        <p>Orientation: {orientation}</p>
        <p>Available Ships: {JSON.stringify(availableShips)}</p>
      </div>
    </div>
  );
};

export default ShipPlacement;