import { describe, it, expect } from "vitest";
import Player from "../playerFactory";
import GameBoard from "../gameBoardFactory";
import Ship from "../shipFactory";
import shipConfig from "../../config/shipConfig";

describe("Player", () => {

  //initializePlayerHuman
  it("should have the same ships as the info given for humans", () => {
    const player = new Player();
    const shipInfo = [
      { length: 4, orientation: 'h', x: 1, y: 1 },
      { length: 3, orientation: 'v', x: 3, y: 5 },
      { length: 1, orientation: 'h', x: 3, y: 5 },
      { length: 5, orientation: 'v', x: 3, y: 5 },
    ];

    player.initializePlayerHuman(shipInfo);

    expect(player.ships).toHaveLength(shipInfo.length);

    shipInfo.forEach(({ length, orientation }) => {
      const ship = player.ships.find((ship) => (ship.length === length) && (ship.orientation === orientation));
      expect(ship).toBeDefined();
    });
  });

  it("should place the ship at the correct positions on the game board for humans", () => {
    const player = new Player();
    const gameboard = player.gameboard;
    const shipInfo = [
      { length: 3, orientation: 'h', x: 1, y: 1 },
    ];

    player.initializePlayerHuman(shipInfo);

    const placedShip = player.ships[0];

    expect(gameboard.board[1][1]).toBe(placedShip);
    expect(gameboard.board[2][1]).toBe(placedShip);
    expect(gameboard.board[3][1]).toBe(placedShip);

  });

  //initializePlayerBot
  it("should create the correct number of ships for bots", () => {
    const player = new Player("BotPlayer", "bot");
    const totalShips = shipConfig.reduce((total, { count }) => total + count, 0);
    expect(player.ships).toHaveLength(totalShips);
  });

  it("should place the correct number of unique ships on the gameboard for bots", () => {
    const player = new Player("BotPlayer", "bot");

    const totalShips = shipConfig.reduce((total, { count }) => total + count, 0);

    const placedShips = [];
    for (let row = 0; row < player.gameboard.size; row++) {
      for (let col = 0; col < player.gameboard.size; col++) {
        const cell = player.gameboard.board[row][col];
        if (cell !== null) {
          // Check if the ship is already added to the placedShips array
          if (!placedShips.includes(cell)) {
            placedShips.push(cell);
          }
        }
      }
    }
    expect(placedShips.length).toBe(totalShips);
  });



});
