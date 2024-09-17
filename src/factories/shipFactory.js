class Ship {
  constructor(length, orientation = "h") {
    this.length = length;
    this.hits = [];
    this.orientation = orientation; //h = horizontal, v= vertical
  }


  hit(x, y) {
    this.hits.push({ x, y });
  }

  isSunk() {
    return this.hits.length === this.length;
  }

  getHitCount() {
    return this.hits.length;
  }

}

export default Ship;
