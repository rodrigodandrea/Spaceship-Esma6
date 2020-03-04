import Rectangle from './rectangle.js';
import { KeyBoard } from './keyboard.js';

export default class Shot extends Rectangle {

    constructor( x, y, width, height ){
        super( x, y, width, height );
        this.timer = 0;
    }

    update(){
        this.moveShots();
    }

    moveShots() {
        this.y -= 10;
    }
}
