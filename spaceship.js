window.addEventListener('load', init, false);

var KEY_ENTER = 13;
var KEY_SPACE = 32;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

var canvas = null;
var ctx = null;
var lastPress = null;
var pressing = [];
var pause;
var player = new Rectangle(90, 280, 10, 10, 0, 3);
var shots = [];
var pause = true;
var gameover = true;
var score = 0;
var enemies = [];
var powerups = [];
var multishot = 1;

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  run();
  repaint();
}

function run() {
  setTimeout(run, 50);
  act();
}

function repaint() {
  requestAnimationFrame(repaint);
  paint(ctx);
}

function random(max) {
  return ~~(Math.random() * max);
}

function reset() {
  score = 0;
  player.x = 90;
  player.y = 280;
  shots.length = 0;
  enemies.length = 0;
  enemies.push(new Rectangle(10, 0, 10, 10, 0, 2));
  gameover = false;
  player.health = 3;
  multishot = 1;
  powerups.length = 0
  player.timer = 0;
}

function act() {
  if (!pause) {

    // GameOver Reset
    if (gameover) {
      reset();
    }

    /* Move Rect
    if(pressing[KEY_UP]) {
      player.y-=10;
    }*/

    if (pressing[KEY_RIGHT]) {
      player.x += 10;
    }

    /*if(pressing[KEY_DOWN]) {
      player.y+=10;
    }*/

    if (pressing[KEY_LEFT]) {
      player.x -= 10;
    }

    // Out Screen
    if (player.x > canvas.width - player.width) {
      player.x = canvas.width - player.width;
    }

    if (player.x < 0) {
      player.x = 0;
    }

    // New Shot
    if (lastPress == KEY_SPACE) {
      if (multishot == 3) {
        shots.push(new Rectangle(player.x - 3, player.y + 2, 5, 5));
        shots.push(new Rectangle(player.x + 3, player.y, 5, 5));
        shots.push(new Rectangle(player.x + 9, player.y + 2, 5, 5));
      } else if (multishot == 2) {
        shots.push(new Rectangle(player.x, player.y, 5, 5));
        shots.push(new Rectangle(player.x + 5, player.y, 5, 5));
      } else {
        shots.push(new Rectangle(player.x + 3, player.y, 5, 5));
      }  
      lastPress = null;
    }

    // Move Enemies
    for (var i = 0, l = enemies.length; i < l; i++) {
      if (enemies[i].timer > 0) {
        enemies[i].timer--;
      }

      // Shot Intersects Enemy
      for (var j = 0, ll = shots.length; j < ll; j++) {
        if (shots[j].intersects(enemies[i])) {
          score++;
          enemies[i].health--;
          if (enemies[i].health < 1) {
            // Add PowerUp
            var r = random(20);
            if (r < 5) {
              if (r == 0) {
                // New MultiShot
                powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 10, 10, 1));
              } else {
                // New ExtraPoints
                powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 10, 10, 0));
              }
            }
            enemies[i].x = random(canvas.width / 10) * 10;
            enemies[i].y = 0;
            enemies[i].health = 2;
            enemies.push(new Rectangle(random(canvas.width / 10) * 10, 0, 10, 10, 0, 2));
          } else {
            enemies[i].timer = 1;
          }
          shots.splice(j--, 1);
          ll--;
        }
      }

      enemies[i].y += 10;
      if (enemies[i].y > canvas.height) {
        enemies[i].x = random(canvas.width / 10) * 10;
        enemies[i].y = 0;
      }

      // Player Intersects Enemy
      if (player.intersects(enemies[i]) && player.timer < 1) {
        player.health--;
        player.timer = 20;
      }

      // Shot Intersects Enemy
      for (var j = 0, ll = shots.length; j < ll; j++) {
        if (shots[j].intersects(enemies[i])) {
          score++;
          enemies[i].health--;
          if (enemies[i].health < 1) {
            // Add PowerUp
            var r = random(20);
            if (r < 5) {
              if (r == 0) {
                // New MultiShot
                powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 10, 10, 1));
              } else {
                // New ExtraPoints
                powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 10, 10, 0));
              }
            }
            enemies[i].x = random(canvas.width / 10) * 10;
            enemies[i].y = 0;
            enemies[i].health = 2;
            enemies.push(new Rectangle(random(canvas.width / 10) * 10, 0, 10, 10, 0, 2));
          } else {
            enemies[i].timer = 1;
          }
          shots.splice(j--, 1);
          ll--;
        }
      }
    }

    // Move Shots
    for (var i = 0, l = shots.length; i < l; i++) {
      shots[i].y -= 10;
      if (shots[i].y < 0) {
        shots.splice(i--, 1);
        l--;
      }
    }

    // Damaged
    if (player.timer > 0) {
      player.timer--;
    }

    // GameOver
    if (player.health < 1) {
      gameover = true;
      pause = true;
    }
  }

  // Move PowerUps
  for (var i = 0, l = powerups.length; i < l; i++) {
    powerups[i].y += 10;
    // Powerup Outside Screen
    if (powerups[i].y > canvas.height) {
      powerups.splice(i--, 1);
      l--;
      continue;
    }
    // Player intersects
    if (player.intersects(powerups[i])) {
      if (powerups[i].type == 1) {
        // MultiShot
        if (multishot < 3) {
          multishot++;
        } else {
          score += 5;
        }
      } else {
        // ExtraPoints
        score += 5;
      }
      powerups.splice(i--, 1);
      l--;
    }
  }

  // Pause/Unpause
  if (lastPress == KEY_ENTER) {
    pause = !pause;
    lastPress = null;
  }
}

function paint(ctx) {

  // Clear canvas 
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = '#0f0';
  player.fill(ctx);

  // Enemies
  for (var i = 0, l = enemies.length; i < l; i++) {
    if (enemies[i].health == 2) {
      ctx.fillStyle = '#0a3f21';
    } else {
      ctx.fillStyle = '#01f4f5';
    }
    enemies[i].fill(ctx);
  }

  // Draw shot
  ctx.fillStyle = '#f00';
  for (var i = 0, l = shots.length; i < l; i++) {
    shots[i].fill(ctx);
  }

  // Improves
  for (var i = 0, l = powerups.length; i < l; i++) {
    if (powerups[i].type == 1) {
      ctx.fillStyle = '#f90';
    } else {
      ctx.fillStyle = '#cc6';
      powerups[i].fill(ctx);
    }
  }

  // Inmunity
  if (player.timer % 2 == 0) {
    player.fill(ctx);
  }

  // Show health    
  ctx.fillStyle = '#fff'
  ctx.fillText('Health: ' + player.health, 150, 20);

  // Show score
  ctx.fillStyle = '#fff';
  ctx.fillText('Score: ' + score, 50, 20);
  //ctx.fillText('Last Press: '+lastPress,0,20);
  //ctx.fillText('Shots: '+shots.length,0,30);

  if (pause) {
    ctx.textAlign = 'center';
    if (gameover) {
      ctx.fillText('GAME OVER', 100, 150);
    } else {
      ctx.fillText('PAUSE', 100, 150);
      ctx.textAlign = 'left';
    }
  }
}

document.addEventListener('keydown', function (evt) {
  lastPress = evt.keyCode;
  pressing[evt.keyCode] = true;
}, false);

document.addEventListener('keyup', function (evt) {
  pressing[evt.keyCode] = false;
}, false);

function Rectangle(x, y, width, height, type, health) {
  this.x = (x == null) ? 0 : x;
  this.y = (y == null) ? 0 : y;
  this.width = (width == null) ? 0 : width;
  this.height = (height == null) ? this.width : height;
  this.type = (type == null) ? 1 : type;
  this.health = (health == null) ? 1 : health;
  this.timer = 0;
}

Rectangle.prototype.intersects = function (rect) {
  if (rect != null) {
    return (this.x < rect.x + rect.width &&
      this.x + this.width > rect.x &&
      this.y < rect.y + rect.height &&
      this.y + this.height > rect.y);
  }
}

Rectangle.prototype.fill = function (ctx) {
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) { window.setTimeout(callback, 17); };
})();