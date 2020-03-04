import { KeyBoard } from './keyboard.js';
import MathRandom from './mathRandom.js';
import Rectangle from './rectangle.js';
import Star from './star.js'
import Player from './player.js';
import Enemy from './enemy.js';
import Powerup from './powerups.js';
//import Shot from './shots.js';

window.addEventListener('load', init, false);
KeyBoard.listen();


let canvas = null;
let ctx = null;
let pause = true;
let gameover = true;
let powerups = [];
let player = new Player(200, 530, 40, 40, 3);
let enemies = [];
let stars = [];
let bgTimer = 0;
let eTimer = 20;
let background = new Image();
let smallships = new Image();
let fstrip = new Image();
let spaceship = new Image();
background.src = '../src/assets/nebula.png';
smallships.src = '../src/assets/smallships.png';
fstrip.src = '../src/assets/fstrip.png';
spaceship.src = '../src/assets/spaceship.png';

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 580;

  for (let i = 0; i < 200; i++) {
    stars.push(new Star(MathRandom.mathR(canvas.width), MathRandom.mathR(canvas.height), MathRandom.mathR(200)));
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

function reset() {
  player.score = 0;
  player.x = 200;
  player.y = 530;
  player.shots.length = 0;
  enemies.length = 0;
  powerups.length = 0;
  player.messages.length = 0;
  enemies.push(new Enemy(40, 0, 40, 40, 0, 2));
  gameover = false;
  player.health = 3;
  player.timer = 0;
  player.multishot = 1;
}

function act() {
  if (!pause) {

    // GameOver Reset
    if (gameover) {
      reset();
    }

    player.update();

    // Generate Enemy
    eTimer--;
    if (eTimer < 0) {
     enemies.push(new Enemy(0, 60, 40, 40, 1));
      eTimer = 20 + MathRandom.mathR(40);
    }

    // Move Enemies
    for (let i = 0, l = enemies.length; i < l; i++) {
      if (enemies[i].timer > 0) {
        enemies[i].timer--;
      }

      // Shooter
      if (enemies[i].type == 1) {
        enemies[i].x += 10;
        // Shooter Outside Screen
        if (enemies[i].x > canvas.width) {
          enemies.splice(i--, 1);
          l--;
          continue;
        }

        // Shooter Shots
        enemies[i].timer--;
        if (enemies[i].timer < 0) {
          enemies.push(new Enemy(enemies[i].x + 3, enemies[i].y + 5, 10, 10, 2));
          enemies[i].timer = 10 + MathRandom.mathR(30);
        }

        // Shot Intersects Shooter
        for (let j = 0, ll = player.shots.length; j < ll; j++) {
          if (player.shots[j].intersects(enemies[i])) {
            player.score++;
            player.shots.splice(j--, 1);
            ll--;
            enemies.splice(i--, 1);
            l--;
          }
        }
      }

      // EnemyShot
      else if (enemies[i].type == 2) {
        enemies[i].y += 10;
        // EnemyShot Outside Screen
        if (enemies[i].y > canvas.height) {
          enemies.splice(i--, 1);
          l--;
          continue;
        }

        // Player Intersects EnemyShot
        if (player.intersects(enemies[i]) && player.timer < 1) {
          player.health--;
          player.timer = 20;
        }
      }

      // Shot Intersects Enemy
      for (let j = 0, ll = player.shots.length; j < ll; j++) {
        if (player.shots[j].intersects(enemies[i])) {
          player.score++;
          enemies[i].health--;
          if (enemies[i].health < 1) {
            // Add PowerUp
            let r = MathRandom.mathR(20);
            if (r < 5) {
              if (r == 0) {
                // New MultiShot
                powerups.push(new Powerup(enemies[i].x, enemies[i].y, 40, 40, 1));
              } else {
                // New ExtraPoints
                powerups.push(new Powerup(enemies[i].x, enemies[i].y, 40, 40, 0));
              }
            }
            enemies[i].x = MathRandom.mathR(canvas.width / 40) * 40;
            enemies[i].y = 0;
            enemies[i].health = 2;
            if (enemies.legth < 50) {
              enemies.push(new Enemy(MathRandom.mathR(canvas.width / 40) * 40, 0, 40, 40, 0, 2));
            }
          } else {
            enemies[i].timer = 1;
          }
          player.shots.splice(j--, 1);
          ll--;
        }
      }

      if (enemies[i].type == 0) {
        enemies[i].y += 10;
        if (enemies[i].y > canvas.height) {
          enemies[i].x = MathRandom.mathR(canvas.width / 40) * 40;
          enemies[i].y = 0;
        }

        // Player Intersects Enemy
        if (player.intersects(enemies[i]) && player.timer < 1) {
          player.health--;
          player.timer = 20;
        }
      }

      // Shot Intersects Enemy
      for (let j = 0, ll = player.shots.length; j < ll; j++) {
        if (player.shots[j].intersects(enemies[i])) {
          player.score++;
          enemies[i].health--;
          if (enemies[i].health < 1) {
            // Add PowerUp
            let r = MathRandom.mathR(20);
            if (r < 5) {
              if (r == 0) {
                // New MultiShot
                powerups.push(new Powerup(enemies[i].x, enemies[i].y, 40, 40, 1));
              } else {
                // New ExtraPoints
                powerups.push(new Powerup(enemies[i].x, enemies[i].y, 40, 40, 0));
              }
            }
            enemies[i].x = MathRandom.mathR(canvas.width / 40) * 40;
            enemies[i].y = 0;
            enemies[i].health = 2;
            if (enemies.length < 50) {
              enemies.push(new Enemy(MathRandom.mathR(canvas.width / 40) * 40, 0, 40, 40, 0, 2));
            }
          } else {
            enemies[i].timer = 1;
          }
          player.shots.splice(j--, 1);
          ll--;
        }
      }
    }

    //Check For Powerup Pickup
    for (var i = 0, l = powerups.length; i < l; i++) {
      powerups[i].y += 10;
      player.checkPowerUp(powerups[i]);
      if (player.intersects(powerups[i])) {
        powerups.splice(i--, 1);
        l--; 
      }
      // Powerup Outside Screen
      if (powerups[i].y > canvas.height) {
        powerups.splice(i--, 1);
        l--;
        continue;
      }
    }

    // Move Shots
    for (let i = 0, l = player.shots.length; i < l; i++) {
      player.shots[i].y -= 10;
      if (player.shots[i].y < 0) {
        player.shots.splice(i--, 1);
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

    // Move Stars
    for (let i = 0, l = stars.length; i < l; i++) {
      stars[i].moveStars(canvas.height);
    }

    // Move Background
    bgTimer++;
    if (bgTimer > 0) {
      bgTimer -= background.height;
    }

    // Move Messages
    for (let i = 0, l = player.messages.length; i < l; i++) {
      player.messages[i].y += 2;
      if (player.messages[i].y < 200) {
        player.messages.splice(i--, 1);
        l--;
      }
    }
  }

  // Pause/Unpause
  if (KeyBoard.lastPress == KeyBoard.KEY_ENTER) {
    pause = !pause;
    KeyBoard.lastPress = null;
  }
}

function paint(ctx) {


  // Clear canvas 
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Background
  if (background.width) {
    ctx.drawImage(background, 0, bgTimer);
    ctx.drawImage(background, 0, background.height + bgTimer);
  }

  // Draw player
  player.drawImageArea(ctx, spaceship, 0, 0, 150, 150);

  // Enemies
  for (let i = 0, l = enemies.length; i < l; i++) {
    if (enemies[i].type == 0) {
      if (enemies[i].health == 2) {
        ctx.fillStyle = '#0a3f21';
        enemies[i].drawImageArea(ctx, smallships, 35, 100, 25, 25);
      } else {
        ctx.fillStyle = '#01f4f5';
        enemies[i].drawImageArea(ctx, smallships, 35, 128, 25, 25);
      }
    }
    else if (enemies[i].type == 1) {
      enemies[i].drawImageArea(ctx, smallships, 35, 200, 25, 25);
    }
    else if (enemies[i].type == 2) {
      enemies[i].drawImageArea(ctx, fstrip, 168, 21, 12, 12);
    }
  }

  // Draw shot
  ctx.fillStyle = '#f00';
  for (let i = 0, l = player.shots.length; i < l; i++) {
    player.shots[i].drawImageArea(ctx, fstrip, 21, 21, 8, 8);
  }

  // Draw powerups
  for (let i = 0, l = powerups.length; i < l; i++) {
    if(powerups.type == 1) {
      ctx.strokeStyle='#f90';
      powerups[i].drawImageArea(ctx, smallships, 35, 68, 25, 25);
    }
    else {
      ctx.strokeStyle='#cc6';
      powerups[i].drawImageArea(ctx, smallships, 35, 68, 25, 25);
    }
  }

  // Messages
  ctx.fillStyle = '#fff';
  for (let i = 0, l = player.messages.length; i < l; i++) {
    ctx.fillText(player.messages[i].string, player.messages[i].x, player.messages[i].y - 50);
  }

  // Draw stars
  for (let i = 0, l = stars.length; i < l; i++) {
    let c = 255 - Math.abs(100 - stars[i].timer);
    ctx.fillStyle = 'rgb(' + c + ', ' + c + ', ' + c + ')';
    ctx.fillRect(stars[i].x, stars[i].y, 2, 2);
  }

  // Show health    
  ctx.fillStyle = '#fff'
  ctx.fillText('Health: ' + player.health, 350, 20);

  // Show score
  ctx.fillStyle = '#fff';
  ctx.fillText('Score: ' + player.score, 50, 20);

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

window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) { window.setTimeout(callback, 17); };
})();