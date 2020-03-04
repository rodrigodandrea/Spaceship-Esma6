export default class Message {

constructor(string, x, y) {
    this.string = (string == null) ? '?' : string;
    this.x = (x == null) ? 0 : x;
    this.y = (y == null) ? 0 : y;
  }
}