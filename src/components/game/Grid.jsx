import React from 'react';
import '../../grid.css';

const Grid = ({ player, onClick }) => {
  const { board, attackLocations } = player.gameboard;
  const isBot = (player.type === 'bot');

  return (
    <div className="grid">
      {board.map((row, x) =>
        row.map((cell, y) => {
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
              {x},{y}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Grid;
