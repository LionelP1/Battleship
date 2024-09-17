import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import Player from '../../factories/playerFactory';


const generateBotPlayer = () => {
  return new Player('Bot Player', 'bot');
};

const Game = ({ player }) => {
  const [bot, setBot] = useState(null);

  useEffect(() => {
    const botPlayer = generateBotPlayer();
    setBot(botPlayer);
  }, []);

  return (
    <div className="game">
      <h1>Battleship Game</h1>
      <div className="game-boards">
        <div className="player-board">
          <h2>{player.name}'s Board</h2>
          <Grid player={player} onClick={() => {}} />
        </div>

        {/* Bot's grid */}
        <div className="bot-board">
          <h2>{bot ? bot.name : 'Bot'}'s Board</h2>
          {bot && <Grid player={bot} onClick={() => {}} />}
        </div>
      </div>
    </div>
  );
};

export default Game;