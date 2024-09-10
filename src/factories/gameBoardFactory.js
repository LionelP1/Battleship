class GameBoard {
    constructor(size = 10) {
        this.size = size;
        //Generates 2D, 10x10 board with each cell set to null
        this.board = Array.from({ length: this.size }, () => Array(this.size).fill(null));
        this.ships = [];
        this.hits = [];
    }

    placeShip(ship, x, y) {
        const orientation = ship.orientation;
        
        if (!this.isValidPlacement(ship, x, y)) {
          return
        }
    
        const offsetX = (orientation === 'h') ? 1 : 0;
        const offsetY = (orientation === 'v') ? 1 : 0;

        for (let i = 0; i < ship.length; i++) {
            const posX = x + i * offsetX;
            const posY = y + i * offsetY;
            this.board[posX][posY] = ship;
        }
        
        this.ships.push({ ship, x, y, orientation });
    }


    isValidPlacement(ship, x, y) {

    }

    placeShipRandom(ship) {

    }

    receiveAttack(x, y) {

    }

    allShipsSunk() {
        
    }  
}