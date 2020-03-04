import Rectangle from './rectangle.js';
import { KeyBoard } from './keyboard.js';
import Shot from './shots.js';
import Powerup from './powerups.js'
import Message from './message.js'


export default class Player extends Rectangle {

  constructor(x, y, width, height, health) {
    super(x, y, width, height);
    this.health = (health === undefined) ? 1 : health;
    this.timer = 0;
    this.shots = [];
    this.multiShot = 1;
    this.score = 0;
    this.messages = [];
  }

  update() {
    this.movePlayer();
    this.checkStatus();
  }

  movePlayer() {
    if (KeyBoard.pressing[KeyBoard.KEY_UP]) {
      this.y -= 10;
    }
    if (KeyBoard.pressing[KeyBoard.KEY_RIGHT]) {
      this.x += 10;
    }
    if (KeyBoard.pressing[KeyBoard.KEY_DOWN]) {
      this.y += 10;
    }
    if (KeyBoard.pressing[KeyBoard.KEY_LEFT]) {
      this.x -= 10;
    }
    if (KeyBoard.lastPress == KeyBoard.KEY_SPACE) {
      if (this.multishot == 3) {
        this.shots.push(new Shot(this.x - 12, this.y + 2, 8, 8));
        this.shots.push(new Shot(this.x + 15, this.y, 8, 8));
        this.shots.push(new Shot(this.x + 42, this.y + 2, 8, 8));
      } else if (this.multishot == 2) {
        this.shots.push(new Shot(this.x + 6, this.y, 8, 8));
        this.shots.push(new Shot(this.x + 26, this.y, 8, 8));
      } else {
        this.shots.push(new Shot(this.x + 15, this.y, 8, 8));
      }

      KeyBoard.lastPress = null;
    }
  }
  checkStatus() {
    // Check position
    if (this.x > canvas.width - this.width) {
      this.x = canvas.width - this.width;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y > canvas.height - this.height * 2) {
      this.y = canvas.height - this.height * 2;
    }
    if (this.y < 0) {
      this.y = this.height * 2;
    }
    // Check Hp
    if (this.timer > 0) {
      this.timer = this.timer - 1;
    }
    if (this.health == 0) {
      gameover = true;
      pause = true;
    }
  }

  checkPowerUp(Powerups){
    // Player intersects
    if (this.intersects(Powerups)) {
      if (Powerups.type == 1) {
        // MultiShot
        if (this.multishot < 3) {
          this.multishot++;
          this.messages.push(new Message("Multi", this.x, this.y));
        } else {
          this.score += 5;
          this.messages.push(new Message("+5", this.x, this.y));
        }
      } else {
        // ExtraPoints
        this.score += 5;
        this.messages.push(new Message("+5", this.x, this.y));
      }
    }
  }
}