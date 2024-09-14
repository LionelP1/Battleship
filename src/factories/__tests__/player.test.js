import { describe, it, expect } from "vitest";
import Player from "../playerFactory";
import GameBoard from "../gameBoardFactory";
import Ship from "../shipFactory";
import shipConfig from "../../config/shipConfig";

describe("Player", () => {
  //placeShip
  it("should correctly place a ship on the game board", () => {
    const player = new Player();
    player.placeShip(3, "h", 2, 2);

    const gameboard = player.gameboard;
    const placedShip = player.ships[0];

    expect(gameboard.board[2][2]).toBe(placedShip);
    expect(gameboard.board[3][2]).toBe(placedShip);
    expect(gameboard.board[4][2]).toBe(placedShip);

    expect(player.ships).toHaveLength(1);
    expect(player.ships[0].length).toBe(3);
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
