class GameBoard {
  constructor(size = 10) {
    this.size = size;
    //Generates 2D, 10x10 board with each cell set to null
    this.board = Array.from({ length: this.size }, () =>
      Array(this.size).fill(null)
    );

    this.missedShots = Array.from({ length: this.size }, () =>
      Array(this.size).fill(false)
    );
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
      this.board[posX][posY] = ship;
    }
  }

  isValidPlacement(ship, x, y) {
    const { length, orientation } = ship;
  
    if (orientation === "h") {
      if (x < 0 || y < 0 || x + length > this.size || y >= this.size) return false;
      
      for (let i = 0; i < length; i++) {
        if (this.board[x + i][y] !== null) return false;
      }
    } else if (orientation === "v") {
      if (x < 0 || y < 0 || y + length > this.size || x >= this.size) return false;
      
      for (let i = 0; i < length; i++) {
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

        if (this.isValidPlacement(ship, x, y)) {
          this.placeShip(ship, x, y);
          placed = true;
        }
      }
    });
  }


  receiveAttack(x, y) {
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
      this.missedShots[x][y] = true;
      return false;
    }
  }
}

export default GameBoard;
