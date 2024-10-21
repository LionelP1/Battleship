import React, { useState } from 'react';
import './App.css';
import GameManager from './components/game/GameManager';
import StartMenu from './components/StartMenu';
import backgroundImage from './assets/background.jpg';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="app"
      style={{ 
          backgroundImage: `url(${backgroundImage})`
      }}
    >
      {gameStarted ? (
        <div className="game-wrapper">
          <GameManager />
        </div>
      ) : (
        <div className="start-menu-wrapper">
          <StartMenu onStart={handleStartGame} />
        </div>
      )}
    </div>
  );
}

export default App;

// import React, { useState } from 'react';
// import './App.css';
// import GameManager from './components/game/GameManager';
// import StartMenu from './components/StartMenu';
// import backgroundImage from './assets/background.jpg'; // Import the image

// function App() {
//     const [gameStarted, setGameStarted] = useState(false);

//     const handleStartGame = () => {
//         setGameStarted(true);
//     };

//     return (
//         <div 
//             className="app" 
//             style={{ 
//                 backgroundImage: `url(${backgroundImage})` // Set the background image inline
//             }}
//         >
//             {gameStarted ? (
//                 <div className="game-wrapper">
//                     <GameManager />
//                 </div>
//             ) : (
//                 <div className="start-menu-wrapper">
//                     <StartMenu onStart={handleStartGame} />
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;