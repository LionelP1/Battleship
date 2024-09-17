import React, { useState, useCallback } from 'react';
import ShipButtons from './ShipButtons';
import PlaceShipsButtons from './PlaceShipsButtons';
import shipConfig from '../../config/shipConfig';
import Player from '../../factories/playerFactory';
import Grid from './Grid';
// import '../../styles/shipplacement.css';

// Function to initialize available ships based on shipConfig
const initializeShips = () => {
  const initialShips = {};
  shipConfig.forEach(ship => {
    initialShips[ship.id] = ship.count;
  });
  return initialShips;
};


const ShipPlacement = ({ onStartGame }) => {
  const [selectedShip, setSelectedShip] = useState(null);
  const [orientation, setOrientation] = useState('h');
  const [availableShips, setAvailableShips] = useState(initializeShips); 
  const [player, setPlayer] = useState(new Player());

  const handlePlaceShip = useCallback((x, y) => {
    if (selectedShip && availableShips[selectedShip.id] > 0) {
      const shipLength = selectedShip.length;

      if (player.gameboard.isValidPlacement(shipLength, orientation, x, y)) {
        // Create a new Player instance with updated gameboard
        // const updatedPlayer = new Player();
        // updatedPlayer.gameboard.board = JSON.parse(JSON.stringify(player.gameboard.board));
        const updatedPlayer = player.copy();

        updatedPlayer.placeShip(shipLength, orientation, x, y);

        // Update state
        setPlayer(updatedPlayer);
        setAvailableShips(prev => ({
          ...prev,
          [selectedShip.id]: prev[selectedShip.id] - 1
        }));
      }
    }
  }, [selectedShip, availableShips, orientation, player]);

  const handleClear = () => {
    setPlayer(new Player());
    setAvailableShips(initializeShips);
    setSelectedShip(null);
    setOrientation('h');
  };

  const allShipsPlaced = Object.values(availableShips).every(count => count === 0);

  const handleStart = () => {
    if (allShipsPlaced) {
      onStartGame(player);
    }
  };

  return (
    <div className="ship-placement">
      <ShipButtons selectedShip={selectedShip} setSelectedShip={setSelectedShip} availableShips={availableShips} />
      <PlaceShipsButtons
        orientation={orientation}
        setOrientation={setOrientation}
        handleClear={handleClear}
        allShipsPlaced={allShipsPlaced}
        handleStart={handleStart} 
      />

      <div className="info">
        <p>Info</p>
        <p>Selected Ship: {JSON.stringify(selectedShip)}</p>
        <p>Orientation: {orientation}</p>
        <p>Available Ships: {JSON.stringify(availableShips)}</p>
        <p>Player: {JSON.stringify(player)}</p>
      </div>

      <Grid player={player} onClick={handlePlaceShip} />


    </div>
  );
};

export default ShipPlacement;