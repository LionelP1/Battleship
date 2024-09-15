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

    expect(board.isValidPlacement(shipH.length, shipH.orientation, 6, 0)).toBe(false);
  
    expect(board.isValidPlacement(shipV.length, shipV.orientation, 0, 6)).toBe(false);
  });

  it("should return false for negative ship placement values", () => {
    const board = new GameBoard();
    
    const shipH = new Ship(1, "h");
    const shipV = new Ship(1, "v");

    expect(board.isValidPlacement(shipH.length, shipH.orientation, -1, 0)).toBe(false);
    expect(board.isValidPlacement(shipH.length, shipH.orientation, 0, -1)).toBe(false);
  
    expect(board.isValidPlacement(shipV.length, shipV.orientation, -1, 0)).toBe(false);
    expect(board.isValidPlacement(shipV.length, shipV.orientation, 0, -1)).toBe(false);
  });

  it("should return false for ship placement over ship", () => {
    const board = new GameBoard();
    const ship1 = new Ship(3, "h");
    const ship2 = new Ship(2, "h");

    // Place the first ship
    board.placeShip(ship1, 0, 0);

  
    expect(board.isValidPlacement(ship2.length, ship2.orientation, 0, 0)).toBe(false);
});


  it("should not place a ship if placement is invalid", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(5, "h");

    gameBoard.placeShip(ship, 8, 8);

    expect(gameBoard.board[8][8]).toBe(null);
  });


  //receiveAttack tests
  it("should record a hit on the ship", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3, "h");
    gameBoard.placeShip(ship, 0, 0);

    const result = gameBoard.receiveAttack(0, 0);

    expect(ship.hits).toContainEqual({ x: 0, y: 0});
    expect(result).toBe(true);
  });

  it("should record a missed hit", () => {
    const gameBoard = new GameBoard();

    const result = gameBoard.receiveAttack(5, 5);

    expect(result).toBe(false);
    expect(gameBoard.attackLocations[5][5]).toBe(true);
  });

  it("should sink the ship after all hits", () => {
    const gameBoard = new GameBoard();
    const ship = new Ship(3, "h");
    gameBoard.placeShip(ship, 0, 0);

    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(1, 0);2
    gameBoard.receiveAttack(2, 0);

    expect(ship.isSunk()).toBe(true);
  });

  it("should return false for out of bounds attacks", () => {
    const gameBoard = new GameBoard();

    const result1 = gameBoard.receiveAttack(-1, 0);
    const result2 = gameBoard.receiveAttack(10, 0);
    const result3 = gameBoard.receiveAttack(0, -1);
    const result4 = gameBoard.receiveAttack(0, 10);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
    expect(result4).toBe(false);
  });

  //placeShipsRandom
  it("should place all ships on the board", () => {
    const shipArray = [
      new Ship(3, "h"),
      new Ship(2, "v"),
      new Ship(4, "h"),
    ];

    const gameBoard = new GameBoard();
    gameBoard.placeShipsRandom(shipArray);

    // Array to keep track of found ships
    const foundShips = [];

    // Scan the board for ships
    for (let x = 0; x < gameBoard.size; x++) {
      for (let y = 0; y < gameBoard.size; y++) {
        const cell = gameBoard.board[x][y];
        if (cell !== null && !foundShips.includes(cell)) {
          foundShips.push(cell);
        }
      }
    }
    
    expect(foundShips.length).toBe(shipArray.length);

    shipArray.forEach(ship => {
      expect(foundShips).toContain(ship);
    });
  });
});
