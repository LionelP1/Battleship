import React from 'react';
import './App.css';
// import Grid from './components/game/Grid';
import ShipButtons from './components/game/ShipButtons';
import ShipPlacement from './components/game/ShipPlacement';

const handleCellClick = (row, col) => {
  console.log(`Cell clicked: Row ${row}, Col ${col}`);
};

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <ShipPlacement />
    </div>
  );
}

export default App;
