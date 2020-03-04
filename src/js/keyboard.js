class Keyboard {

  constructor() {
    this.KEY_LEFT = 37;
    this.KEY_UP = 38;
    this.KEY_RIGHT = 39;
    this.KEY_DOWN = 40;
    this.KEY_ENTER = 13;
    this.KEY_SPACE = 32;
    this.lastPress = null;
    this.pressing = [];
  }

  listen() {
    
    document.addEventListener('keydown', evt => {
      this.lastPress = evt.keyCode;
      this.pressing[evt.keyCode] = true;
    }, false);
  
    document.addEventListener('keyup', evt => {
      this.pressing[evt.keyCode] = false;
    }, false);
  }    
}

export const KeyBoard = new Keyboard();