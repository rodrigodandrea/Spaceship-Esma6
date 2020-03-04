export default class Star {

  constructor (x, y, timer) {
      this.x = (x == null) ? 0 : x;
      this.y = (y == null) ? 0 : y;
      this.timer = (timer == null) ? 0 : timer;
  }

  moveStars(height) {
    this.y ++;
    if (this.y > height) {
      this.y = 0;
    }
    this.timer += 10;
    if (this.timer > 200) {
      this.timer -= 200;
    }
  }
}

