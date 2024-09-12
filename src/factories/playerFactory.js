import GameBoard from "./gameBoardFactory";
import Ship from "./shipFactory";

class Player {
  constructor(name = "Captain") {
    this.name = name;
    this.ships = [];
    this.gameboard = new GameBoard();
  }

  initializePlayer(shipInfo) {
    shipInfo.forEach(({ length, orientation, x, y }) => {
      const ship = new Ship(length, orientation);
      this.ships.push(ship);

      this.gameboard.placeShip(ship, x, y);
    });
  }




}

export default Player;
