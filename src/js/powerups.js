import Rectangle from './rectangle.js';

export default class Powerup extends Rectangle {

  constructor( x, y, width, height, type ){
    super( x, y, width, height );
    this.type = (type === undefined) ? 1 : type;
  }
}
