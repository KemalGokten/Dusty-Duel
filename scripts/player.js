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
        lives
      });
  
      this.dx = 0;
      this.dy = 0;
      this.canMove = false;
    }

    onDestroy(){
        super.onDestroy();
        this.xPosition = playerObject.xPosition;
        this.yPosition = playerObject.yPosition;
        this.health = 100;
        this.lives = 3;
    }
  
    movePlayer() {
        if (this.canMove) {
          const { newX, newY } = this.calculateNextFrameMove();
    
          // Ensure player stays within bounds
          this.xPosition = Math.max(0, Math.min(newX, 1582));
          this.yPosition = Math.max(200, Math.min(newY, 675));
    
          // Call moveGO method from GameObject class
          this.moveGO(this.xPosition, this.yPosition);
        }
      }
  
    calculateNextFrameMove() {
      return {
        newX: this.xPosition + this.dx * this.speed,
        newY: this.yPosition + this.dy * this.speed,
      };
    }
  
  
    takeDamage(damage){
      this.health -= damage;
      if(this.health <= 0){
          this.health = 100;
          this.lives -= 1;
  
          if(this.lives <= 0){
              dispatchCustomEvent(changeScene, [gameContainer, townContainer]);
          }
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
  };
  