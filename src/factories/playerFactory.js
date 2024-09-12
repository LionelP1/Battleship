import GameBoard from "./gameBoardFactory";
import Ship from "./shipFactory";

class Player {
  constructor(name) {
    this.name = name;
    this.ships = [];
    this.gameboard = new GameBoard();
  }


}

export default Player;
