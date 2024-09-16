import React, { useState, useCallback } from 'react';
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
    // Initialize the available ships with the count from shipConfig
    //Will be of this form: {0:1, 1:1, 2:2, 3:1, 4:1}
    const initialShips = {};
    shipConfig.forEach(ship => {
      initialShips[ship.id] = ship.count;
    });
    return initialShips;
  });

  const [player, setPlayer] = useState(new Player());

  const handlePlaceShip = useCallback((x, y) => {
    if (selectedShip && availableShips[selectedShip.id] > 0) {
      const shipLength = selectedShip.length;

      if (player.gameboard.isValidPlacement(shipLength, orientation, x, y)) {
        // Create a new Player instance with updated gameboard
        const updatedPlayer = new Player();
        updatedPlayer.gameboard.board = JSON.parse(JSON.stringify(player.gameboard.board));
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

  return (
    <div className="ship-placement">
      <ShipButtons selectedShip={selectedShip} setSelectedShip={setSelectedShip} availableShips={availableShips} />
      <PlaceShipsButtons orientation={orientation} setOrientation={setOrientation} />

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





// import React, { useState, useCallback } from 'react';
// import ShipButtons from './ShipButtons';
// import PlaceShipsButtons from './PlaceShipsButtons';
// import shipConfig from '../../config/shipConfig';
// import Player from '../../factories/playerFactory';
// import Grid from './Grid';
// // import '../../styles/shipplacement.css';

// const ShipPlacement = () => {
//   const [selectedShip, setSelectedShip] = useState(null);
//   const [orientation, setOrientation] = useState('h');
//   const [availableShips, setAvailableShips] = useState(() => {
//     const initialShips = {};
//     shipConfig.forEach(ship => {
//       initialShips[ship.id] = ship.count;
//     });
//     return initialShips;
//   });
//   const [player, setPlayer] = useState(new Player());

//   const handlePlaceShip = useCallback((x, y) => {
//     if (selectedShip && availableShips[selectedShip] > 0) {
//       const shipLength = shipConfig.find(ship => ship.id === selectedShip)?.length;

//       if (shipLength && player.gameboard.isValidPlacement(shipLength, orientation, x, y)) {
//         // Create a new Player instance with updated gameboard
//         const updatedPlayer = new Player();
//         updatedPlayer.gameboard = { ...player.gameboard };
//         updatedPlayer.placeShip(shipLength, orientation, x, y);

//         // Update state
//         setPlayer(updatedPlayer);
//         setAvailableShips(prev => ({
//           ...prev,
//           [selectedShip]: prev[selectedShip] - 1
//         }));
//       }
//     }
//   }, [selectedShip, availableShips, orientation, player]);

//   return (
//     <div className="ship-placement">
//       <ShipButtons selectedShip={selectedShip} setSelectedShip={setSelectedShip} />
//       <PlaceShipsButtons orientation={orientation} setOrientation={setOrientation} />
      
//       <Grid player={player} onClick={handlePlaceShip} />

//       <div className="info">
//         <p>Selected Ship: {selectedShip}</p>
//         <p>Orientation: {orientation}</p>
//         <p>Available Ships: {JSON.stringify(availableShips)}</p>
//       </div>
//     </div>
//   );
// };

// export default ShipPlacement;