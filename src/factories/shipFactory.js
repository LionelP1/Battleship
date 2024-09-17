class Ship {
  constructor(length, orientation = "h") {
    this.length = length;
    this.hits = [];
    this.orientation = orientation; //h = horizontal, v= vertical
  }


  hit(x, y) {
    if (
      this.hits.some(hit => hit.x === x && hit.y === y) || // Check if coordinates are already hit
      x < 0 || x >= this.length || y < 0 || y >= this.length
    ) {
      return;
    }
    this.hits.push({ x, y });
  }

  isSunk() {
    return this.hits.length === this.length;
  }

  getHitCount() {
    return this.hits.length;
  }

  copy() {
    return new Ship(this.length, this.orientation);
  }
}

export default Ship;
