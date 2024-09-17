// import React, { useState, useEffect, useCallback } from 'react';
// import Grid from './Grid';
// import Player from '../../factories/playerFactory';


// const generateBotPlayer = () => {
//   return new Player('Bot Player', 'bot');
// };

// const Game = ({ player }) => {
// 	const [bot, setBot] = useState(generateBotPlayer);
//   const [playerState, setPlayerState] = useState(player);
// 	const [gameStatus, setGameStatus] = useState('ongoing');

//   const botShipBoard = JSON.parse(JSON.stringify(bot.gameboard.board))
//   const playerShipBoard = JSON.parse(JSON.stringify(playerState.gameboard.board))

// 	const checkGameOver = () => {
//     if (playerState.allShipsSunk()) {
//       setGameStatus('botWon');
//     } else if (bot.allShipsSunk()) {
//       setGameStatus('playerWon');
//     }
//   };

//   const handlePlayerAttack = (x, y) => {
//     if (!playerState.checkAttackValid(x, y, bot.gameboard)) return;
//     const updatedBot = { ...bot };
//     const updatedPlayer = { ...playerState };

//     setBot(updatedBot);
//     setPlayerState(updatedPlayer);
//     checkGameOver();

//     if (gameStatus === 'ongoing') {
//       botAttackPlayer();
//     }
//   };
 
// 	const botAttackPlayer = () => {
// 		const updatedBot = { ...bot };
// 		const updatedPlayer = { ...playerState };
	
// 		updatedBot.randomAttack(updatedPlayer.gameboard);
	
// 		setPlayerState(updatedPlayer);
// 		setBot(updatedBot);
// 	};

//   return (
//     <div className="game">
//       <h1>Battleship Game</h1>
//       <div className="game-boards">
//         <div className="player-board">
//           <h2>{player.name}'s Board</h2>
//           <Grid player={player} onClick={()=>{}} />
// 					<p>Player: {JSON.stringify(playerState)}</p>
//         </div>

//         {/* Bot's grid */}
//         <div className="bot-board">
//           <h2>{bot.name}'s Board</h2>         
// 					<Grid player={bot} onClick={handlePlayerAttack} />
// 					<p>Bot: {JSON.stringify(bot)}</p>
// 				</div>
//       </div>
//     </div>
//   );
// };

// export default Game;


import React, { useState, useEffect, useCallback } from 'react';
import Grid from './Grid';
import Player from '../../factories/playerFactory';

const generateBotPlayer = () => {
  return new Player('Bot Player', 'bot');
};

const Game = ({ player }) => {
	const [bot, setBot] = useState(generateBotPlayer);
  const [playerState, setPlayerState] = useState(player);
	const [gameStatus, setGameStatus] = useState('ongoing');


  const botShipBoard = JSON.parse(JSON.stringify(bot.gameboard.board))
  const playerShipBoard = JSON.parse(JSON.stringify(playerState.gameboard.board))

  // const generateNewPlayer = () => {
  //   let player = new Player();
  //   player.gameboard.board = playerShipBoard;
  // }

	const checkGameOver = () => {
    if (playerState.allShipsSunk()) {
      setGameStatus('botWon');
    } else if (bot.allShipsSunk()) {
      setGameStatus('playerWon');
    }
  };

  const handlePlayerAttack = (x, y) => {
    if (!playerState.checkAttackValid(x, y, bot.gameboard)) return;
    const updatedBot = { ...bot };
    const updatedPlayer = { ...playerState };

    setBot(updatedBot);
    setPlayerState(updatedPlayer);
    checkGameOver();

    if (gameStatus === 'ongoing') {
      botAttackPlayer();
    }
  };



 
	const botAttackPlayer = () => {
		const updatedBot = { ...bot };
		const updatedPlayer = { ...playerState };
	
		updatedBot.randomAttack(updatedPlayer.gameboard);
	
		setPlayerState(updatedPlayer);
		setBot(updatedBot);
	};

  return (
    <div className="game">
      <h1>Battleship Game</h1>
      <div className="game-boards">
        <div className="player-board">
          <h2>{player.name}'s Board</h2>
          <Grid player={player} onClick={()=>{}} />
					<p>Player: {JSON.stringify(playerState)}</p>
        </div>

        {/* Bot's grid */}
        <div className="bot-board">
          <h2>{bot.name}'s Board</h2>         
					<Grid player={bot} onClick={handlePlayerAttack} />
					<p>Bot: {JSON.stringify(bot)}</p>
				</div>
      </div>
    </div>
  );
};

export default Game;