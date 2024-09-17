import React from 'react';
import Grid from './Grid'; // Import any necessary components

const generateBotPlayer = () => {

};

  

const Game = ({ player }) => {
  return (
    <div className="game">
      <h1>Battle Ship Game</h1>
      <Grid player={player} onClick={() => {}} />
      
    </div>
  );
};

export default Game;