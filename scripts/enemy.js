class Enemies {
  constructor(levelIndex, player) {
    this.enemyTypes = [
      {
        health: 100,
        damage: 10,
        armor: 0,
        src: "assets/images/enemyImages/enemy1/walk/bro1_walk0001@2x.png",
        width: 125,
        height: 125,
        xPosition: 25,
        yPosition: 200,
        className: "enemy1",
        speed: 3,
        animationFrames: enemyWalkImages[0],
      },
      {
        health: 100,
        damage: 20,
        armor: 10,
        src: "assets/images/enemyImages/enemy2/walk/bro5_walk0001@2x.png",
        width: 125,
        height: 125,
        xPosition: 25,
        yPosition: 200,
        className: "enemy1",
        speed: 4,
        animationFrames: enemyWalkImages[1],
      },
      {
        health: 100,
        damage: 30,
        armor: 30,
        src: "assets/images/enemyImages/enemy3/walk/bro3_walk0001@2x.png",
        width: 125,
        height: 125,
        xPosition: 25,
        yPosition: 200,
        className: "enemy1",
        speed: 5,
        animationFrames: enemyWalkImages[2],
      },
    ];
    this.enemies = [];
    this.enemyType = this.enemyTypes[levelIndex - 1];
    this.player = player;
  }

  createEnemy(enemiesContainer) {
    const yRandom = getRandomValue(200, 675);
    const randomChoice = Math.round(getRandomValue(0, 1));

    let xRandom = 1582 + this.enemyType.width;
    if (randomChoice === 1) {
      xRandom = 0 - this.enemyType.width;
    }

    const enemy = new Enemy({
      health: this.enemyType.health,
      damage: this.enemyType.damage,
      armor: this.enemyType.armor,
      speed: this.enemyType.speed,
      width: this.enemyType.width,
      height: this.enemyType.height,
      xPosition: xRandom,
      yPosition: yRandom,
      src: this.enemyType.src,
      className: this.enemyType.className,
      animationFrames: this.enemyType.animationFrames,
    });

    enemy.createGOElement(enemiesContainer);
    this.enemies.push(enemy);
    enemy.setAnimationState("walk");
    this.shouldMove = true;
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
    className,
    animationFrames,
  }) {
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
      animationFrames,
    });
  }

  chasePlayer(playerX, playerY) {
    if (this.shouldMove) {
      super.moveGOPosition(playerX, playerY);
    }
  }
}

const enemyWalkImages = [
  // Enemy type 1 walk images
  {
    walk: [
      "assets/images/enemyImages/enemy1/walk/bro1_walk0001@2x.png",
      "assets/images/enemyImages/enemy1/walk/bro1_walk0002@2x.png",
      "assets/images/enemyImages/enemy1/walk/bro1_walk0003@2x.png",
      "assets/images/enemyImages/enemy1/walk/bro1_walk0004@2x.png",
      "assets/images/enemyImages/enemy1/walk/bro1_walk0005@2x.png",
      "assets/images/enemyImages/enemy1/walk/bro1_walk0006@2x.png",
      "assets/images/enemyImages/enemy1/walk/bro1_walk0007@2x.png",
      "assets/images/enemyImages/enemy1/walk/bro1_walk0008@2x.png",
      "assets/images/enemyImages/enemy1/walk/bro1_walk0009@2x.png",
      "assets/images/enemyImages/enemy1/walk/bro1_walk0010@2x.png",
      "assets/images/enemyImages/enemy1/walk/bro1_walk0011@2x.png",
      "assets/images/enemyImages/enemy1/walk/bro1_walk0012@2x.png",
      "assets/images/enemyImages/enemy1/walk/bro1_walk0013@2x.png",
      "assets/images/enemyImages/enemy1/walk/bro1_walk0014@2x.png",
    ],
  },
  // Enemy type 2 walk images
  {
    walk: [
      "assets/images/enemyImages/enemy2/walk/bro5_walk0001@2x.png",
      "assets/images/enemyImages/enemy2/walk/bro5_walk0002@2x.png",
      "assets/images/enemyImages/enemy2/walk/bro5_walk0003@2x.png",
      "assets/images/enemyImages/enemy2/walk/bro5_walk0004@2x.png",
      "assets/images/enemyImages/enemy2/walk/bro5_walk0005@2x.png",
      "assets/images/enemyImages/enemy2/walk/bro5_walk0006@2x.png",
      "assets/images/enemyImages/enemy2/walk/bro5_walk0007@2x.png",
      "assets/images/enemyImages/enemy2/walk/bro5_walk0008@2x.png",
      "assets/images/enemyImages/enemy2/walk/bro5_walk0009@2x.png",
      "assets/images/enemyImages/enemy2/walk/bro5_walk0010@2x.png",
      "assets/images/enemyImages/enemy2/walk/bro5_walk0011@2x.png",
      "assets/images/enemyImages/enemy2/walk/bro5_walk0012@2x.png",
      "assets/images/enemyImages/enemy2/walk/bro5_walk0013@2x.png",
      "assets/images/enemyImages/enemy2/walk/bro5_walk0014@2x.png",
    ],
  },
  // Enemy type 3 walk images
  {
    walk: [
      "assets/images/enemyImages/enemy3/walk/bro3_walk0001@2x.png",
      "assets/images/enemyImages/enemy3/walk/bro3_walk0002@2x.png",
      "assets/images/enemyImages/enemy3/walk/bro3_walk0003@2x.png",
      "assets/images/enemyImages/enemy3/walk/bro3_walk0004@2x.png",
      "assets/images/enemyImages/enemy3/walk/bro3_walk0005@2x.png",
      "assets/images/enemyImages/enemy3/walk/bro3_walk0006@2x.png",
      "assets/images/enemyImages/enemy3/walk/bro3_walk0007@2x.png",
      "assets/images/enemyImages/enemy3/walk/bro3_walk0008@2x.png",
      "assets/images/enemyImages/enemy3/walk/bro3_walk0009@2x.png",
      "assets/images/enemyImages/enemy3/walk/bro3_walk0010@2x.png",
      "assets/images/enemyImages/enemy3/walk/bro3_walk0011@2x.png",
      "assets/images/enemyImages/enemy3/walk/bro3_walk0012@2x.png",
      "assets/images/enemyImages/enemy3/walk/bro3_walk0013@2x.png",
      "assets/images/enemyImages/enemy3/walk/bro3_walk0014@2x.png",
    ],
  },
];
