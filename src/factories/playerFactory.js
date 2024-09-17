import GameBoard from "./gameBoardFactory";
import Ship from "./shipFactory";
import shipConfig from "../config/shipConfig";

class Player {
  constructor(name = "Player", type = "human", boardSize = 10) {
    this.name = name;
    this.ships = [];
    this.gameboard = new GameBoard(boardSize);
    this.type = type;

    if (this.type === 'bot') {
      this.initializePlayerBot();
    }
  }

  placeShip(length, orientation, x, y) {
    const ship = new Ship(length, orientation);
    this.gameboard.placeShip(ship, x, y);
    this.ships.push(ship); 
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
  
        if (this.gameboard.isValidPlacement(ship.length, ship.orientation, x, y)) {
          this.gameboard.placeShip(ship, x, y);
          this.ships.push(ship);
          placed = true;
        }
      }
    });
  }


  attack(x, y, opponentGameboard) {
    if (!this.checkAttackValid(x, y, opponentGameboard)) {return};
    this.gameboard.attackLocations[x][y] = true;
    opponentGameboard.receiveAttack(x, y);
  }

  randomAttack(opponentGameboard) {
    let x, y;
  
    do {
      x = Math.floor(Math.random() * opponentGameboard.size);
      y = Math.floor(Math.random() * opponentGameboard.size);
    } while (!this.checkAttackValid(x, y, opponentGameboard));
  
    this.attack(x, y, opponentGameboard);
  }

  checkAttackValid(x, y, gameboard) {
    // Check if coordinates are within bounds
    if (x < 0 || x >= gameboard.size || y < 0 || y >= gameboard.size) {
      return false;
    }
  
    // Check if the location has already been attacked
    if (this.gameboard.attackLocations[x][y]) {
      return false;
    }

    return true;
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }

  allLocationsAttacked() {
    return this.gameboard.attackLocations.flat().every(location => location);
  }

  isGameOver() {
    return this.allShipsSunk() || this.allLocationsAttacked();
  }

  resetPlayer() {
    this.ships = [];
    this.gameboard.clearBoard();

    if (this.type === 'bot') {
      this.initializePlayerBot();
    }
  }

  copy() {
    const newPlayer = new Player(this.name, this.type, this.gameboard.size);
    newPlayer.gameboard = this.gameboard.copy();
    newPlayer.ships = this.ships.map(ship => ship.copy());
    return newPlayer;
  }


}

export default Player;

