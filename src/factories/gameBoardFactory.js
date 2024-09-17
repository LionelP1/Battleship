import Ship from "./shipFactory";

class GameBoard {
  constructor(size = 10) {
    this.size = size;
    //Generates 2D, 10x10 board with each cell set to null
    this.board = Array.from({ length: this.size }, () =>
      Array(this.size).fill(null)
    );

    this.attackLocations = Array.from({ length: this.size }, () =>
      Array(this.size).fill(false)
    );
  }

  placeShip(ship, x, y) {
    if (!this.isValidPlacement(ship.length, ship.orientation, x, y)) {
      return;
    }

    const orientation = ship.orientation;

    const offsetX = orientation === "h" ? 1 : 0;
    const offsetY = orientation === "v" ? 1 : 0;

    for (let i = 0; i < ship.length; i++) {
      const posX = x + i * offsetX;
      const posY = y + i * offsetY;
      this.board[posX][posY] = ship;
    }
  }


  isValidPlacement(shipLength, shipOrientation, x, y) {

    if (shipOrientation === "h") {
      if (x < 0 || y < 0 || x + shipLength > this.size || y >= this.size) return false;

      for (let i = 0; i < shipLength; i++) {
        if (this.board[x + i][y] !== null) return false;
      }
    } else if (shipOrientation === "v") {
      if (x < 0 || y < 0 || y + shipLength > this.size || x >= this.size) return false;

      for (let i = 0; i < shipLength; i++) {
        if (this.board[x][y + i] !== null) return false;
      }
    } else {
      return false;
    }
    return true;
  }

  placeShipsRandom(shipArray) {
    shipArray.forEach((ship) => {
      let placed = false;

      while (!placed) {
        const x = Math.floor(Math.random() * this.size);
        const y = Math.floor(Math.random() * this.size);

        if (this.isValidPlacement(ship.length, ship.orientation, x, y)) {
          this.placeShip(ship, x, y);
          placed = true;
        }
      }
    });
  }

  receiveAttack(x, y) {
    // Check if coordinates are within bounds
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
      return false;
    }

    const ship = this.board[x][y];

    if (ship !== null) {
      // Ship Hit
      ship.hit(x, y);
      return true;
    } else {
      // Ship Missed
      return false;
    }
  }

  clearBoard() {
    // Reset the board to initial state with all cells set to null
    this.board = Array.from({ length: this.size }, () =>
      Array(this.size).fill(null)
    );

    // Reset attack locations to initial state with all cells set to false
    this.attackLocations = Array.from({ length: this.size }, () =>
      Array(this.size).fill(false)
    );
  }

  copy() {
    const newGameBoard = new GameBoard(this.size);
    newGameBoard.board = JSON.parse(JSON.stringify(this.board));
    newGameBoard.attackLocations = JSON.parse(JSON.stringify(this.attackLocations));

    
    return newGameBoard;

  }

}

export default GameBoard;