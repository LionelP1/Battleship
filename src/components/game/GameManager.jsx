import React, { useState } from 'react';
import ShipPlacement from './ShipPlacement';
import Game from './Game';

const GameManager = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [player, setPlayer] = useState(null);

  const handleStartGame = (playerInstance) => {
    setPlayer(playerInstance);
    setGameStarted(true);
  };

  const handleResetGame = () => {
    setGameStarted(false);
    setPlayer(null);
  };


  return (
    <div className="game-setup">
      {!gameStarted ? (
        <ShipPlacement onStartGame={handleStartGame} />
      ) : (
        <Game player={player} onGameOver={handleResetGame} />
      )}
    </div>
  );
};

export default GameManager;