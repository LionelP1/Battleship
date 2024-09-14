import React from 'react';
import '../../styles/grid.css';

const Grid = ({ onClick = () => {} }) => {
  const gridSize = 10;
  let cellId = 1; // Initialize counter

  // Cell component defined inside Grid component
  const Cell = ({ row, col, onClick }) => {
    return (
      <div
        className="cell"
        onClick={() => onClick(row, col)}
        data-row={row}
        data-col={col}
      >
        {row},{col}
      </div>
    );
  };

  // Generate grid with rows and columns
  const cells = [];
  for (let row = 1; row <= gridSize; row++) {
    for (let col = 1; col <= gridSize; col++) {
      cells.push(
        <Cell
          key={cellId}
          row={row}
          col={col}
          onClick={onClick}
        />
      );
      cellId++;
    }
  }

  return (
    <div className="grid">
      {cells}
    </div>
  );
};

export default Grid;

