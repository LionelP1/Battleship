import GameBoard from "./gameBoardFactory";
import Ship from "./shipFactory";
import shipConfig from "../config/shipConfig";

class Player {
  constructor(name = "Captain", type = "human") {
    this.name = name;
    this.ships = [];
    this.gameboard = new GameBoard();
    this.type = type;
  }

  initializePlayer(shipInfo) {
    if (this.type === 'human' && shipInfo) {
      this.initializeHuman(shipInfo);
    } else if (this.type === 'bot') {
      this.initializeBot();
    }
  }

  initializePlayerHuman(shipInfo) {
    shipInfo.forEach(({ length, orientation, x, y }) => {
      const ship = new Ship(length, orientation);
      this.ships.push(ship);

      this.gameboard.placeShip(ship, x, y);
    });
  }

  initializePlayerBot(shipInfo) {

  }

}

export default Player;

