export default class Zombie {
    constructor(x, y, health, speed, player) {
      this.x = x;
      this.y = y;
      this.health = health;
      this.speed = speed;
      this.player = player;
      this.width = 50;
      this.height = 50;
      this.img = new Image();
      this.img.src = "img/zombie.png"
    }
  
    draw(ctx) {
      this.move();
      ctx.drawImage(this.img, this.x, this.y);
    }
  
    move() {
      if (this.x < this.player.x)
        this.x += this.speed;
      else 
        this.x -= this.speed;
      
      if (this.y < this.player.y)
        this.y += this.speed;
      else 
        this.y -= this.speed;
    }

    takeDamage(damage) {
      this.health -= damage;
    }
  }
  