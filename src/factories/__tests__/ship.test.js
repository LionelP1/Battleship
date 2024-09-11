import { describe, it, expect } from 'vitest';
import Ship from '../shipFactory';

describe('Ship', () => {
  it('should initialize with correct length and orientation', () => {
    const ship = new Ship(4, 'v');
    expect(ship.length).toBe(4);
    expect(ship.orientation).toBe('v');
  });

  it('should record a hit at a given position', () => {
    const ship = new Ship(3);
    ship.hit(1);
    expect(ship.hits).toContain(1);
    expect(ship.getHitCount()).toBe(1);
  });

  it('should not allow hits outside the ship length', () => {
    const ship = new Ship(3);
    ship.hit(-1);
    ship.hit(3);
    expect(ship.hits).toEqual([]);
  });

  it('should not record the same position twice', () => {
    const ship = new Ship(3);
    ship.hit(1);
    ship.hit(1);
    expect(ship.hits.length).toBe(1);
  });

  it('should sink when all positions are hit', () => {
    const ship = new Ship(3);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBe(true);
  });

  it('should not be sunk if not all positions are hit', () => {
    const ship = new Ship(3);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toBe(false);
  });
});