export default class Player {
    constructor(no, x, y, bulletController, canvas) {
      this.no = no
      this.x = x;
      this.y = y;
      this.health = 500;
      this.canvas = canvas;
      this.bulletController = bulletController;
      this.width = 195;
      this.height = 203;
      this.speed = 5;
      this.img = new Image();
      this.img.src = "img/plant-player.webp";
  
      this.keyUp = no == 1 ? "KeyW" : "ArrowUp";
      this.keyDown = no == 1 ? "KeyS" : "ArrowDown";
      this.keyLeft = no == 1 ? "KeyA" : "ArrowLeft";
      this.keyRight = no == 1 ? "KeyD" : "ArrowRight";
      this.keyShoot = no == 1 ? "Space" : "Enter";

      window.addEventListener("keydown", this.keydown, true);
      window.addEventListener("keyup", this.keyup, true);

    }
  
    draw(ctx) {
      this.move();
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  
      this.shoot();
    }
  
    shoot() {
      if (this.shootPressed) {
        const speed = 5;
        const delay = 7;
        const damage = 1;
        const bulletX = this.x + this.width / 2;
        const bulletY = this.y + 45;
        this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
      }
    }
  
    move() {
      if (this.downPressed && this.y < (this.canvas.height-250)) {
        this.y += this.speed;
      }
      if (this.upPressed && this.y > 50) {
        this.y -= this.speed;
      }
      if (this.leftPressed && this.x > 50) {
        this.x -= this.speed;
      }
      if (this.rightPressed && this.x < (this.canvas.width-250)) {
        this.x += this.speed ;
      } 
    }

  
  
    keydown = (e) => {
      console.log(this.no + ": " + e.code);
      switch(e.code) {
        case this.keyUp:
          this.upPressed = true;
          break;
        case this.keyDown:
          this.downPressed = true;
          break;
        case this.keyLeft:
          this.leftPressed = true;
          break;
        case this.keyRight:
          this.rightPressed = true;
          break;
        case this.keyShoot:
          this.shootPressed = true;
          break;
      } 
    };
  
    keyup = (e) => {
      switch(e.code) {
        case this.keyUp:
          this.upPressed = false;
          break;
        case this.keyDown:
          this.downPressed = false;
          break;
        case this.keyLeft:
          this.leftPressed = false;
          break;
        case this.keyRight:
          this.rightPressed = false;
              break;
        case this.keyShoot:
          this.shootPressed = false;
          break;
      } 
    };
    
    takeDamage(damage) {
      this.health -= damage;
    }
  }
  