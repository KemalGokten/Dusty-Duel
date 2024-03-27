class Enemies {
  constructor(levelIndex,player) {
    this.enemyTypes = [
      {
        health: 100,
        damage: 10,
        armor: 0,
        src: "../assets/images/bro5_idle0002@2x.png",
        width: 125,
        height: 125,
        xPosition: 25,
        yPosition: 200,
        className: "enemy1",
        speed: 3
      },
      {
        health: 100,
        damage: 20,
        armor: 10,
        src: "../assets/images/bro5_idle0002@2x.png",
        width: 125,
        height: 125,
        xPosition: 25,
        yPosition: 200,
        className: "enemy1",
        speed: 4
      },
      {
        health: 100,
        damage: 30,
        armor: 30,
        src: "../assets/images/bro5_idle0002@2x.png",
        width: 125,
        height: 125,
        xPosition: 25,
        yPosition: 200,
        className: "enemy1",
        speed: 5
      },
    ];
    this.enemies = [];
    this.enemyType = this.enemyTypes[levelIndex - 1];
    this.player = player;
  }

  createEnemy(enemiesContainer) {
    const enemy = new Enemy({
      health: this.enemyType.health,
      damage: this.enemyType.damage,
      armor: this.enemyType.armor,
      speed: this.enemyType.speed,
      width: this.enemyType.width,
      height: this.enemyType.height,
      xPosition: this.enemyType.xPosition,
      yPosition: this.enemyType.yPosition,
      src: this.enemyType.src,
      className: this.enemyType.className,
    });
    enemy.createGOElement(enemiesContainer);
    this.enemies.push(enemy);
  }
}

class Enemy extends GameObject {
  constructor({
    health = 100,
    damage = 10,
    armor = 0,
    lives = 1,
    speed = 3,
    src,
    xPosition = 0,
    yPosition = 0,
    width = 0,
    height = 0,
    className}
  ) {
    super({
      speed,
      src,
      xPosition,
      yPosition,
      width,
      height,
      className,
      health,
      damage,
      armor,
      lives,
    });

  }

  chasePlayer(playerX, playerY) {
    super.moveGOPosition(playerX, playerY);
  }

  takeDamage(damage) {
    // Apply armor reduction if needed
    const effectiveDamage = Math.max(damage - this.armor, 0);

    // Reduce enemy's health
    this.health -= effectiveDamage;
  }
}
