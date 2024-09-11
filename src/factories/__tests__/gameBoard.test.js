import { describe, it, expect } from "vitest";
import GameBoard from "../gameBoardFactory";
import Ship from "../shipFactory";

describe("GameBoard", () => {
  it("should initialize a 10x10 board", () => {
    const gameBoard = new GameBoard();
    expect(gameBoard.board.length).toBe(10);
    expect(gameBoard.board[0].length).toBe(10);
    expect(gameBoard.board.flat().every((cell) => cell === null)).toBe(true);
  });

  it("should place a horizontal ship at a valid position", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3, "h");

    gameBoard.placeShip(ship, 0, 0);

    expect(gameBoard.board[0][0]).toBe(ship);
    expect(gameBoard.board[0][1]).toBe(ship);
    expect(gameBoard.board[0][2]).toBe(ship);
  });

  it("should place a vertical ship at a valid position", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3, "v");

    gameBoard.placeShip(ship, 0, 0);

    expect(gameBoard.board[0][0]).toBe(ship);
    expect(gameBoard.board[1][0]).toBe(ship);
    expect(gameBoard.board[2][0]).toBe(ship);
  });

  it("should not place a ship if placement is invalid", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(5, "h");

    const result = gameBoard.placeShip(ship, 8, 8);

    expect(result).toBeUndefined();
    expect(gameBoard.board[8][8]).toBe(null);
  });

  it("should record a hit on the ship", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3, "h");
    gameBoard.placeShip(ship, 0, 0);

    gameBoard.receiveAttack(0, 0);

    expect(ship.hits).toContain(0);
  });

  it("should record a missed hit", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3, "h");
    gameBoard.placeShip(ship, 0, 0);

    gameBoard.receiveAttack(5, 5);

    expect(gameBoard.hits).toContain([5, 5]);
  });

  it("should check if all ships are sunk", () => {
    const gameBoard = new GameBoard();
    const ship1 = new Ship(3, "h");
    const ship2 = new Ship(2, "v");

    gameBoard.placeShip(ship1, 0, 0);
    gameBoard.placeShip(ship2, 5, 5);

    ship1.hit(0);
    ship1.hit(1);
    ship1.hit(2);
    ship2.hit(0);
    ship2.hit(1);

    expect(gameBoard.allShipsSunk()).toBe(true);
  });
});
