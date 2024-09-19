import React from 'react';
import '../../styles/grid.css';

const Grid = ({ player, onClick }) => {
  const { board, attackLocations } = player.gameboard;
  const isBot = (player.type === 'bot');

  return (
    <div className="grid-wrapper">
      <div className="grid">
      {board[0].map((_, y) => (  // Iterate over columns
        board.map((row, x) => {  // Iterate over rows
          const cell = row[y];
          const isHit = attackLocations[x][y];
          const hasShip = (cell !== null);

          const cellClasses = ['cell'];
          if (isHit) {
            cellClasses.push(hasShip ? 'hit' : 'miss');
          } else if (!isBot && hasShip) {
            cellClasses.push('ship');
          }
          return (
            <div
              key={`${x},${y}`}
              className={cellClasses.join(' ')}
              onClick={() => onClick(x, y)}
              >
            </div>
          );
        })
      ))}
      </div>
    </div>

  );
};

export default Grid;