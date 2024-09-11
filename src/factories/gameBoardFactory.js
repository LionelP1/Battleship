class GameBoard {
  constructor(size = 10) {
    this.size = size;
    //Generates 2D, 10x10 board with each cell set to null
    this.board = Array.from({ length: this.size }, () =>
      Array(this.size).fill(null)
    );
    this.ships = [];
    this.hits = [];
  }

  placeShip(ship, x, y) {
    const orientation = ship.orientation;

    if (!this.isValidPlacement(ship, x, y)) {
      return;
    }

    const offsetX = orientation === "h" ? 1 : 0;
    const offsetY = orientation === "v" ? 1 : 0;

    for (let i = 0; i < ship.length; i++) {
      const posX = x + i * offsetX;
      const posY = y + i * offsetY;
      this.board[posY][posX] = ship;
    }

    this.ships.push({ ship, x, y, orientation });
  }

  isValidPlacement(ship, x, y) {
    const { length, orientation } = ship;

    if (orientation === "h") {
      if (x < 0 || y < 0 || y + length > this.size) return false;
      for (let i = 0; i < length; i++) {
        if (this.board[x][y + i] !== null) return false;
      }
    } else if (orientation === "v") {
      // Vertical ship placement
      if (x < 0 || y < 0 || x + length > this.size) return false;
      
      // Check if the ship would overlap with another ship
      for (let i = 0; i < length; i++) {
        if (this.board[x + i][y] !== null) return false;
      }
    } else {
      // Invalid orientation
      return false;
    }
    
    return true;
  }

  placeShipRandom(ship) {}

  receiveAttack(x, y) {}

  allShipsSunk() {}
}

export default GameBoard;
