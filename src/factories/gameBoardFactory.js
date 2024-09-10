class GameBoard {
    constructor(size = 10) {
        this.size = size;
        //Generates 2D, 10x10 board with each cell set to null
        this.board = Array.from({ length: this.size }, () => Array(this.size).fill(null));
        this.ships = [];
        this.hits = [];
    }


    placeShip(ship, x, y) {

    }

    placeShipRandom(ship) {

    }

    receiveAttack(x, y) {

    }

    allShipsSunk() {
        
    }  
}