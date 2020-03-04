import Rectangle from './rectangle';

export default class Enemy extends Rectangle {
    
    constructor(x, y, width, height, type, health){
        super(x, y, width, height);
        this.health = (health == null) ? 1 : health;
        this.type = (type == null) ? 1 : type;
    }

    /*init() {
        
    }
        
    update(player1) {
        this.moveEnemy();
        this.checkIntersect(player1);
    }
    // Enemy checks position
    checkIntersect(player1){
        if(player.intersects(this) && player.timer == 0){
            player.health = player.health - 1;
            player.timer = 20;
        }
    }
    moveEnemy () {
        this.y += 2;
        if (this.timer > 0) this.timer--;
        if (this.y > canvas.height) {
            this.x = MathRandom.max(canvas.width / 10) * 10;
            this.y = 0;
        }
    }*/
}    