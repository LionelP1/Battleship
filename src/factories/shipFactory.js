class Ship {
  constructor(length, orientation = "h") {
    this.length = length;
    this.hits = [];
    this.orientation = orientation; //h = horizontal, v= vertical
  }

  hit(position) {
    if (
      this.hits.includes(position) ||
      position < 0 ||
      position >= this.length
    ) {
      return;
    }
    this.hits.push(position);
  }

  isSunk() {
    return this.hits.length === this.length;
  }

  getHitCount() {
    return this.hits.length;
  }
}

export default Ship;
