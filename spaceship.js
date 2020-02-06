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
var player = new Rectangle(200, 530, 40, 40, 0, 3);
var shots = [];
var enemies = [];
var powerups = [];
var messages = [];
var ships = new Image();
ships.src = 'assets/ships.png';
var fstrip = new Image();
fstrip.src = 'assets/fstrip.png';
var spaceship = new Image();
spaceship.src = 'assets/spaceship.png';
var stars = [];

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 580;

  for (i = 0; i < 200; i++) {
    stars.push(new Star(random(canvas.width), random(canvas.height), random(200)));
  }

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

function Star(x, y, timer) {
  this.x = (x == null) ? 0 : x;
  this.y = (y == null) ? 0 : y;
  this.timer = (timer == null) ? 0 : timer;
}

function reset() {
  score = 0;
  player.x = 200;
  player.y = 530;
  shots.length = 0;
  enemies.length = 0;
  powerups.length = 0;
  messages.length = 0;
  enemies.push(new Rectangle(40, 0, 40, 40, 0, 2));
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
      player.x += 40;
    }

    /*if(pressing[KEY_DOWN]) {
      player.y+=10;
    }*/

    if (pressing[KEY_LEFT]) {
      player.x -= 40;
    }

    // Out Screen
    if (player.x > canvas.width - player.width) {
      player.x = canvas.width - player.width;
    }

    if (player.x < 0) {
      player.x = 0;
    }

    // Move Stars
    for (i = 0, l = stars.length; i < l; i++) {
      stars[i].y++;
      if (stars[i].y > canvas.height) {
        stars[i].y = 0;
      }
      stars[i].timer += 5;
      if (stars[i].timer > 200) {
        stars[i].timer -= 200;
      }
    }

    // New Shot
    if (lastPress == KEY_SPACE) {
      if (multishot == 3) {
        shots.push(new Rectangle(player.x - 12, player.y + 2, 8, 8));
        shots.push(new Rectangle(player.x + 15, player.y, 8, 8));
        shots.push(new Rectangle(player.x + 42, player.y + 2, 8, 8));
      } else if (multishot == 2) {
        shots.push(new Rectangle(player.x + 6, player.y, 8, 8));
        shots.push(new Rectangle(player.x + 26, player.y, 8, 8));
      } else {
        shots.push(new Rectangle(player.x + 15, player.y, 8, 8));
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
                powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 40, 40, 1));
              } else {
                // New ExtraPoints
                powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 40, 40, 0));
              }
            }
            enemies[i].x = random(canvas.width / 40) * 40;
            enemies[i].y = 0;
            enemies[i].health = 2;
            enemies.push(new Rectangle(random(canvas.width / 40) * 40, 0, 40, 40, 0, 2));
          } else {
            enemies[i].timer = 1;
          }
          shots.splice(j--, 1);
          ll--;
        }
      }

      enemies[i].y += 10;
      if (enemies[i].y > canvas.height) {
        enemies[i].x = random(canvas.width / 40) * 40;
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
                powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 40, 40, 1));
              } else {
                // New ExtraPoints
                powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 40, 40, 0));
              }
            }
            enemies[i].x = random(canvas.width / 40) * 40;
            enemies[i].y = 0;
            enemies[i].health = 2;
            enemies.push(new Rectangle(random(canvas.width / 40) * 40, 0, 40, 40, 0, 2));
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
      if (messages[i].y < 200) {
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

  // Draw stars
  ctx.fillStyle = '#fff';
  for (i = 0, l = stars.length; i < l; i++) {
    var c = 255 - Math.abs(100 - stars[i].timer);
    ctx.fillStyle = 'rgb(' + c + ', ' + c + ', ' + c + ')';
    ctx.fillRect(stars[i].x, stars[i].y, 1, 1);
  }

  // Draw player
  player.drawImageArea(ctx, spaceship, 0, 0, 150, 150);

  // Enemies
  for (var i = 0, l = enemies.length; i < l; i++) {
    if (enemies[i].health == 2) {
      ctx.fillStyle = '#0a3f21';
      enemies[i].drawImageArea(ctx, ships, 35, 100, 25, 25);
    } else {
      ctx.fillStyle = '#01f4f5';
      enemies[i].drawImageArea(ctx, ships, 35, 100, 25, 25);
    }
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
  }

  // Messages
  ctx.fillStyle = '#fff';
  for (var i = 0, l = messages.length; i < l; i++) {
    ctx.fillText(messages[i].string, messages[i].x, messages[i].y - 50);
  }

  // Show health    
  ctx.fillStyle = '#fff'
  ctx.fillText('Health: ' + player.health, 350, 20);

  // Show score
  ctx.fillStyle = '#fff';
  ctx.fillText('Score: ' + score, 50, 20);

  if (pause) {
    ctx.textAlign = 'center';
    if (gameover) {
      ctx.fillText('GAME OVER', 200, 300);
    } else {
      ctx.fillText('PAUSE', 200, 300);
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

window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) { window.setTimeout(callback, 17); };
})();