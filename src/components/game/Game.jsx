import React, { useState, useEffect, useCallback } from 'react';
import Grid from './Grid';
import Popup from '../Popup';
import Player from '../../factories/playerFactory';


const generateBotPlayer = () => {
  return new Player('Bot Player', 'bot');
};

const Game = ({ player, onGameOver }) => {
	const [bot, setBot] = useState(generateBotPlayer);
  const [playerState, setPlayerState] = useState(player);
	const [gameStatus, setGameStatus] = useState('ongoing');

	const checkGameOver = () => {
    if (playerState.allShipsSunk()) {
      setGameStatus('botWon');
    } else if (bot.allShipsSunk()) {
      setGameStatus('playerWon');
    }
  };

  const testFunction = () => {
    // Create a copy of playerState
    const updatePlayer = playerState.copy();
    updatePlayer.ships[0].hit(0,0);
    console.log(JSON.stringify(updatePlayer.ships));
  }
  

  const handlePlayerAttack = (x, y) => {
    if (!playerState.checkAttackValid(x, y, bot.gameboard)) return;
		const updatedBot = bot.copy();
		const updatedPlayer = playerState.copy();

    updatedPlayer.attack(x, y, bot.gameboard);


    setBot(updatedBot);
    setPlayerState(updatedPlayer);
    checkGameOver();

    if (gameStatus === 'ongoing') {
      botAttackPlayer();
    }
  };
 
	const botAttackPlayer = () => {
		const updatedBot = bot.copy();
		const updatedPlayer = playerState.copy();
	
		updatedBot.randomAttack(updatedPlayer.gameboard);
	
		setPlayerState(updatedPlayer);
		setBot(updatedBot);
    checkGameOver();
	};

  return (
    <div className="game">
      <h1>Battleship Game</h1>
      <p>{gameStatus}</p>
      <div className="game-boards">
        <div className="player-board">
          <h2>{player.name}'s Board</h2>
          <Grid player={playerState} onClick={()=>{}} />
					<p>Player: {JSON.stringify(playerState)}</p>
        </div>

        {/* Bot's grid */}
        <div className="bot-board">
          <h2>{bot.name}'s Board</h2>         
					<Grid player={bot} onClick={handlePlayerAttack} />
					<p>Bot: {JSON.stringify(bot)}</p>
				</div>
      </div>
      {(gameStatus === 'playerWon' || gameStatus === 'botWon') && (
      <Popup 
      message = {gameStatus === 'playerWon' ? 'You Won!' : 'Bot Won!'} 
      picture = {gameStatus === 'playerWon' ? '🏆 ' : '🤖'} 
      onClose = {onGameOver} 
      />
  )}
    </div>
  );
};

export default Game;