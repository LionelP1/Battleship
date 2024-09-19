import React, { useState } from 'react';
import './App.css';
import GameManager from './components/game/GameManager';
import StartMenu from './components/StartMenu';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="app">
      {gameStarted ? (
        <div className="game-wrapper">
          <GameManager />
        </div>
      ) : (
        <div className="start-menu-wrapper">
          <StartMenu onStart={handleStartGame} />
        </div>
      )}
    </div>
  );
}

export default App;
