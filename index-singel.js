import Player from "./Player-singel.js";
import Zombie from "./Zombie.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 650;

const bulletController1 = new BulletController(canvas);
const player1 = new Player(
  1,
  50,
  50,
  bulletController1, 
  canvas
);
const zombies = []

for (let i=0; i<8; i++) {
  zombies.push(new Zombie(random(canvas.width), 
  random(canvas.height), 
  random(4)+1,
  random(4)+1,
  player1))
}

console.log("Start!");
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);



function gameLoop() {
  setCommonStyle();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bulletController1.draw(ctx);
  player1.draw(ctx);

  zombies.forEach((zombie) => {
    if (zombie.player.bulletController.collideWith(zombie)) {
      console.log("collition!")
      if (zombie.health <= 0) {
         const index = zombies.indexOf(zombie);
         zombies.splice(index, 1);
        }
   } 
   else {
    if (zombie.collideWithPlayer()){
      if (zombie.player.health <= 0){
        alert("game over")
      }
    }
     zombie.draw(ctx);
      }
    
  });
}

function keydown(e) {
  console.log(e.code);
  switch(e.code) {
    case "KeyW":
      player1.upPressed = true;
      break;
    case "KeyS":
      player1.downPressed = true;
      break;
    case "KeyA":
      player1.leftPressed = true;
      break;
    case "KeyD":
      player1.rightPressed = true;
      break;
    case "Space":
      player1.shootPressed = true;
      break;
  } 
}

function keyup(e) {
  console.log(e.code);
  switch(e.code) {
    case "KeyW":
      player1.upPressed = false;
      break;
    case "KeyS":
      player1.downPressed = false;
      break;
    case "KeyA":
      player1.leftPressed = false;
      break;
    case "KeyD":
      player1.rightPressed = false;
      break;
    case "Space":
      player1.shootPressed = false;
      break;
  }  
}

function setCommonStyle() {
  ctx.shadowColor = "#d53";
  ctx.shadowBlur = 20;
  ctx.lineJoin = "bevel";
  ctx.lineWidth = 5;
}

function random(max) {
  return Math.floor(Math.random() * max);
}


setInterval(gameLoop, 1000 / 60);
