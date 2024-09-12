import { describe, it, expect } from "vitest";
import Player from "../playerFactory";
import GameBoard from "../gameBoardFactory";
import Ship from "../shipFactory";
// import shipConfig from "../shipConfig";

describe("Player", () => {

  //initializePlayer
  it("should have the same ships as the info given", () => {
    const player = new Player();
    const shipInfo = [
      { length: 4, orientation: 'h', x: 1, y: 1 },
      { length: 3, orientation: 'v', x: 3, y: 5 },
      { length: 1, orientation: 'h', x: 3, y: 5 },
      { length: 5, orientation: 'v', x: 3, y: 5 },
    ];

    player.initializePlayer(shipInfo);

    expect(player.ships).toHaveLength(shipInfo.length);

    shipInfo.forEach(({ length, orientation }) => {
      const ship = player.ships.find((ship) => (ship.length === length) && (ship.orientation === orientation));
      expect(ship).toBeDefined();
    });
  });

  it("should place the ship at the correct positions on the gameboard", () => {
    const player = new Player();
    const gameboard = player.gameboard;
    const shipInfo = [
      { length: 3, orientation: 'h', x: 1, y: 1 },
    ];

    player.initializePlayer(shipInfo);

    const placedShip = new Ship(3,"h");

    expect(gameboard.board[1][1]).toBe(placedShip);
    expect(gameboard.board[2][1]).toBe(placedShip);
    expect(gameboard.board[3][1]).toBe(placedShip);

  });



});
