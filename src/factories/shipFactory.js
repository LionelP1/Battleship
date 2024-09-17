class Ship {
  constructor(length, orientation = "h") {
    this.length = length;
    this.hits = [];
    this.orientation = orientation; //h = horizontal, v= vertical
  }


  hit(x, y) {
    // if (
    //   this.hits.some(hit => hit.x === x && hit.y === y) ||
    //   x < 0 || x >= this.length || y < 0 || y >= this.length
    // ) {
    //   return;
    // }
    console.log('hit');
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
