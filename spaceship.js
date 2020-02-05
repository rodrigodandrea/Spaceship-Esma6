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
var pause = true;
var gameover = true;
var score = 0;
var multishot = 1;
var player = new Rectangle(80, 270, 20, 20, 0, 3);
var shots = [];
var enemies = [];
var powerups = [];
var messages = [];
var ships = new Image();
ships.src = 'assets/ships.png';
var fstrip = new Image();
fstrip.src = 'assets/fstrip.png';

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 300;
  canvas.height = 300;

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

function Message(string, x, y) {
  this.string = (string == null) ? '?' : string;
  this.x = (x == null) ? 0 : x;
  this.y = (y == null) ? 0 : y;
}

function reset() {
  score = 0;
  player.x = 90;
  player.y = 270;
  shots.length = 0;
  enemies.length = 0;
  powerups.length = 0;
  messages.length = 0;
  enemies.push(new Rectangle(10, 0, 20, 20, 0, 2));
  gameover = false;
  player.health = 3;
  player.timer = 0;
  multishot = 1;
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
      player.x += 20;
    }

    /*if(pressing[KEY_DOWN]) {
      player.y+=10;
    }*/

    if (pressing[KEY_LEFT]) {
      player.x -= 20;
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
        shots.push(new Rectangle(player.x - 5, player.y + 2, 5, 5));
        shots.push(new Rectangle(player.x + 8, player.y, 5, 5));
        shots.push(new Rectangle(player.x + 21, player.y + 2, 5, 5));
      } else if (multishot == 2) {
        shots.push(new Rectangle(player.x + 4, player.y, 5, 5));
        shots.push(new Rectangle(player.x + 12, player.y, 5, 5));
      } else {
        shots.push(new Rectangle(player.x + 8, player.y, 5, 5));
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
                powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 20, 20, 1));
              } else {
                // New ExtraPoints
                powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 20, 20, 0));
              }
            }
            enemies[i].x = random(canvas.width / 20) * 20;
            enemies[i].y = 0;
            enemies[i].health = 2;
            enemies.push(new Rectangle(random(canvas.width / 20) * 20, 0, 20, 20, 0, 2));
          } else {
            enemies[i].timer = 1;
          }
          shots.splice(j--, 1);
          ll--;
        }
      }

      enemies[i].y += 5;
      if (enemies[i].y > canvas.height) {
        enemies[i].x = random(canvas.width / 20) * 20;
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
                powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 20, 20, 1));
              } else {
                // New ExtraPoints
                powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 20, 20, 0));
              }
            }
            enemies[i].x = random(canvas.width / 20) * 20;
            enemies[i].y = 0;
            enemies[i].health = 2;
            enemies.push(new Rectangle(random(canvas.width / 20) * 20, 0, 20, 20, 0, 2));
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

    // Move PowerUps
    for (var i = 0, l = powerups.length; i < l; i++) {
      powerups[i].y += 5;
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
            messages.push(new Message("Multi", player.x, player.y));
          } else {
            score += 5;
            messages.push(new Message("+5", player.x, player.y));
          }
        } else {
          // ExtraPoints
          score += 5;
          messages.push(new Message("+5", player.x, player.y));
        }
        powerups.splice(i--, 1);
        l--;
      }
    }

    // Move Messages
    for (var i = 0, l = messages.length; i < l; i++) {
      messages[i].y += 2;
      if (messages[i].y < 260) {
        messages.splice(i--, 1);
        l--;
      }
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
  //ctx.fillStyle = '#0f0';
  player.drawImageArea(ctx, ships, 36, 171, 25, 25);
  //player.fill(ctx);

  // Enemies
  for (var i = 0, l = enemies.length; i < l; i++) {
    if (enemies[i].health == 2) {
      ctx.fillStyle = '#0a3f21';
      enemies[i].drawImageArea(ctx, ships, 35, 100, 25, 25);
    } else {
      ctx.fillStyle = '#01f4f5';
      enemies[i].drawImageArea(ctx, ships, 35, 100, 25, 25);
    }
    //enemies[i].fill(ctx);
  }

  // Draw shot
  ctx.fillStyle = '#f00';
  for (var i = 0, l = shots.length; i < l; i++) {
    //shots[i].fill(ctx);
    shots[i].drawImageArea(ctx, fstrip, 21, 21, 8, 8);
  }

  // PowerUps
  for (var i = 0, l = powerups.length; i < l; i++) {
    if (powerups[i].type == 1) {
      ctx.fillStyle = '#f90';
      powerups[i].drawImageArea(ctx, ships, 35, 68, 25, 25);
    } else {
      ctx.fillStyle = '#cc6';
      powerups[i].drawImageArea(ctx, ships, 35, 68, 25, 25);
    }
    //powerups[i].fill(ctx);
  }

  // Messages
  ctx.fillStyle = '#fff';
  for (var i = 0, l = messages.length; i < l; i++) {
    ctx.fillText(messages[i].string, messages[i].x, messages[i].y - 20);
  }

  // Inmunity
  //if (player.timer % 2 == 0) {
  //  player.fill(ctx);
  //}

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

Rectangle.prototype.drawImageArea = function (ctx, img, sx, sy, sw, sh) {
  if (img.width) {
    ctx.drawImage(img, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
  } else {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

Rectangle.prototype.drawImage = function (ctx, img) {
  if (img.width) {
    ctx.drawImage(img, this.x, this.y);
  } else {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) { window.setTimeout(callback, 17); };
})();