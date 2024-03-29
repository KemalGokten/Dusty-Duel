class Player extends GameObject {
  constructor({
    health = 100,
    damage = 0,
    armor = 0,
    lives = 3,
    speed = 5,
    src,
    xPosition = 0,
    yPosition = 0,
    width = 0,
    height = 0,
    className,
    animationFrames,
    magazine,
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

    this.dx = 0;
    this.dy = 0;
    this.magazine = magazine;
    this.canMove = false;
    this.isWalkingFire = false;
    this.isIdleFire = false;
  }

  onDestroy() {
    super.onDestroy();
    this.xPosition = playerObject.xPosition;
    this.yPosition = playerObject.yPosition;
    this.health = 100;
    this.lives = 1;
    this.healthContainer?.remove();
  }


  movePlayer() {
    if (this.canMove) {
      const { newX, newY } = this.calculateNextFrameMove();

      // Ensure player stays within bounds
      this.xPosition = Math.max(0, Math.min(newX, 1582));
      this.yPosition = Math.max(200, Math.min(newY, 675));

      this.setAnimationState("walk"); // Set animation state to walk when moving

      // Call moveGO method from GameObject class
      this.moveGO(this.xPosition, this.yPosition);
  
    } else {
      this.setAnimationState("idle"); // Set animation state to idle when not movin
    }
  }

  calculateNextFrameMove() {
    return {
      newX: this.xPosition + this.dx * this.speed,
      newY: this.yPosition + this.dy * this.speed,
    };
  }

  takeDamage(damage){
    super.takeDamage(damage);
    if (this.lives === 0) {
      setTimeout(() => {
        dispatchCustomEvent(changeScene, [gameContainer, townContainer]);
      }, 300);
    }
  }



  setMovement(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }

  setPlayerMovementAvailability(available) {
    this.canMove = available;
  }
}

const playerObject = {
  src: "../assets/images/bro5_idle0002@2x.png",
  width: 125,
  height: 125,
  xPosition: 0,
  yPosition: 450,
  className: "player",
  magazine: 6,
};

const playerAnimationFrames = {
  idle: [
    "../assets/images/playerImages/idle/bro5_idle0001@2x.png",
    "../assets/images/playerImages/idle/bro5_idle0002@2x.png",
    "../assets/images/playerImages/idle/bro5_idle0003@2x.png",
    "../assets/images/playerImages/idle/bro5_idle0004@2x.png",
    "../assets/images/playerImages/idle/bro5_idle0005@2x.png",
    "../assets/images/playerImages/idle/bro5_idle0006@2x.png",
    "../assets/images/playerImages/idle/bro5_idle0007@2x.png",
    "../assets/images/playerImages/idle/bro5_idle0008@2x.png",
  ],
  walk: [
    "../assets/images/playerImages/walk/bro5_walk0001@2x.png",
    "../assets/images/playerImages/walk/bro5_walk0002@2x.png",
    "../assets/images/playerImages/walk/bro5_walk0003@2x.png",
    "../assets/images/playerImages/walk/bro5_walk0004@2x.png",
    "../assets/images/playerImages/walk/bro5_walk0005@2x.png",
    "../assets/images/playerImages/walk/bro5_walk0006@2x.png",
    "../assets/images/playerImages/walk/bro5_walk0007@2x.png",
    "../assets/images/playerImages/walk/bro5_walk0008@2x.png",
    "../assets/images/playerImages/walk/bro5_walk0009@2x.png",
    "../assets/images/playerImages/walk/bro5_walk0010@2x.png",
    "../assets/images/playerImages/walk/bro5_walk0011@2x.png",
    "../assets/images/playerImages/walk/bro5_walk0012@2x.png",
    "../assets/images/playerImages/walk/bro5_walk0013@2x.png",
    "../assets/images/playerImages/walk/bro5_walk0014@2x.png",
  ],
  idleFire: [
    "../assets/images/playerImages/idleFire/bro5_fire0001@2x.png",
    "../assets/images/playerImages/idleFire/bro5_fire0002@2x.png",
    "../assets/images/playerImages/idleFire/bro5_fire0003@2x.png",
    "../assets/images/playerImages/idleFire/bro5_fire0004@2x.png",
    "../assets/images/playerImages/idleFire/bro5_fire0005@2x.png",
  ],
  walkFire: [
    "../assets/images/playerImages/walkFire/bro5_walk_and_fire0001@2x.png",
    "../assets/images/playerImages/walkFire/bro5_walk_and_fire0002@2x.png",
    "../assets/images/playerImages/walkFire/bro5_walk_and_fire0003@2x.png",
    "../assets/images/playerImages/walkFire/bro5_walk_and_fire0004@2x.png",
    "../assets/images/playerImages/walkFire/bro5_walk_and_fire0005@2x.png",
    "../assets/images/playerImages/walkFire/bro5_walk_and_fire0006@2x.png",
    "../assets/images/playerImages/walkFire/bro5_walk_and_fire0007@2x.png",
    "../assets/images/playerImages/walkFire/bro5_walk_and_fire0008@2x.png",
    "../assets/images/playerImages/walkFire/bro5_walk_and_fire0009@2x.png",
    "../assets/images/playerImages/walkFire/bro5_walk_and_fire0010@2x.png",
    "../assets/images/playerImages/walkFire/bro5_walk_and_fire0011@2x.png",
    "../assets/images/playerImages/walkFire/bro5_walk_and_fire0012@2x.png",
    "../assets/images/playerImages/walkFire/bro5_walk_and_fire0013@2x.png",
    "../assets/images/playerImages/walkFire/bro5_walk_and_fire0014@2x.png",
  ],
};
