class Ship {
    constructor(length, orientation = 'h') {
      this.length = length;
      this.hits = [];
      this.orientation = orientation; //h = horizontal, v= vertical
    }
    
    //Mark hit on specific position of hits array
    hit(position) {
      if (this.hits.includes(position) || position < 0 || position >= this.length) {
        return;
      }
      this.hits.push(position);
    }
  
    // Checks if the ship is sunk
    isSunk() {
      return this.hits.length === this.length;
    }
  
    // Returns the count of hits the ship has taken
    getHitCount() {
      return this.hits.length;
    }
  }
  
  export default Ship;