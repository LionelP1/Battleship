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
    expect(gameBoard.board[1][0]).toBe(ship);
    expect(gameBoard.board[2][0]).toBe(ship);
  });

  it("should place a horizontal ship at a valid position (2nd Case)", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(4, "h");

    gameBoard.placeShip(ship, 6, 0);

    expect(gameBoard.board[6][0]).toBe(ship);
    expect(gameBoard.board[7][0]).toBe(ship);
    expect(gameBoard.board[8][0]).toBe(ship);
    expect(gameBoard.board[9][0]).toBe(ship);
  });

  it("should place a vertical ship at a valid position", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3, "v");

    gameBoard.placeShip(ship, 0, 0);

    expect(gameBoard.board[0][0]).toBe(ship);
    expect(gameBoard.board[0][1]).toBe(ship);
    expect(gameBoard.board[0][2]).toBe(ship);
  });

  it("should place a vertical ship at a valid position (2nd Case)", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3, "v");

    gameBoard.placeShip(ship, 0, 7);

    expect(gameBoard.board[0][7]).toBe(ship);
    expect(gameBoard.board[0][8]).toBe(ship);
    expect(gameBoard.board[0][9]).toBe(ship);
  });

  //isValidPlacement tests
  it("should return false for horizontal and vertical ship placed out of bounds", () => {
    const board = new GameBoard();
    let shipH = new Ship(5, "h");
    let shipV = new Ship(5, "v");

    expect(board.isValidPlacement(shipH, 6, 0)).toBe(false);
  
    expect(board.isValidPlacement(shipV, 0, 6)).toBe(false);
  });

  it("should return false for negative ship placement values", () => {
    const board = new GameBoard();
    
    const shipH = new Ship(1, "h");
    const shipV = new Ship(1, "v");

    expect(board.isValidPlacement(shipH, -1, 0)).toBe(false);
    expect(board.isValidPlacement(shipH, 0, -1)).toBe(false);
  
    expect(board.isValidPlacement(shipV, -1, 0)).toBe(false);
    expect(board.isValidPlacement(shipV, 0, -1)).toBe(false);
  });

  it("should return false for ship placement over ship", () => {
    const board = new GameBoard();
    const ship1 = new Ship(3, "h");
    const ship2 = new Ship(2, "h");

    // Place the first ship
    board.placeShip(ship1, 0, 0);

    // Trying to place another ship in the overlapping area
    expect(board.isValidPlacement(ship2, 0, 0)).toBe(false);
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
