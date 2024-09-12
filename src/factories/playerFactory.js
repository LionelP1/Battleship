import GameBoard from "./gameBoardFactory";
import Ship from "./shipFactory";
import shipConfig from "../config/shipConfig";

class Player {
  constructor(name = "Captain", type = "human" , shipInfo = null) {
    this.name = name;
    this.ships = [];
    this.gameboard = new GameBoard();
    this.type = type;

    this.initializePlayer(shipInfo);
  }

  initializePlayer(shipInfo) {
    if (this.type === 'human' && shipInfo) {
      this.initializePlayerHuman(shipInfo);
    } else if (this.type === 'bot') {
      this.initializePlayerBot();
    }
  }

  initializePlayerHuman(shipInfo) {
    shipInfo.forEach(({ length, orientation, x, y }) => {
      const ship = new Ship(length, orientation);
      this.ships.push(ship);
      this.gameboard.placeShip(ship, x, y);
    });
  }

  initializePlayerBot() {
    const ships = [];
  
    // Generate an array of ships based on shipConfig
    shipConfig.forEach(({ length, count }) => {
      for (let i = 0; i < count; i++) {
        ships.push(new Ship(length, Math.random() > 0.5 ? 'h' : 'v'));
      }
    });
  
    // Randomly places each ship on the board
    ships.forEach((ship) => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * this.gameboard.size);
        const y = Math.floor(Math.random() * this.gameboard.size);
  
        if (this.gameboard.isValidPlacement(ship, x, y)) {
          this.gameboard.placeShip(ship, x, y);
          this.ships.push(ship);
          placed = true;
        }
      }
    });
  }

  
}

export default Player;

