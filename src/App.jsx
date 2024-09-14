import React from 'react';
import './App.css';
import Grid from './components/game/Grid';

const handleCellClick = (row, col) => {
  console.log(`Cell clicked: Row ${row}, Col ${col}`);
};

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <Grid onClick={handleCellClick} />
    </div>
  );
}

export default App;
