import GameBoard from "./gameBoardFactory";
import Ship from "./shipFactory";

class Player {
  constructor(name = "Captain") {
    this.name = name;
    this.ships = [];
    this.gameboard = new GameBoard();
  }

	initializePlayer(shipInfo) {


	}




}

export default Player;
