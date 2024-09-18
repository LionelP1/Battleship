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
        <GameManager />
      ) : (
        <StartMenu onStart={handleStartGame} />
      )}
    </div>
  );
}

export default App;
