class Bullet extends GameObject {
  constructor({
    xPosition,
    yPosition,
    dx,
    dy,
  }) {
    super({
      src: "../assets/images/bullet.png",
      width: 25,
      height: 10,
      damage: 30,
      speed: 10,
      className: "bullet",
      xPosition,
      yPosition,
    });

    this.dx = dx;
    this.dy = dy;
  }

  moveBullet() {
    // Move the bullet in the direction specified by dx and dy
    this.xPosition += this.dx * this.speed;
    this.yPosition += this.dy * this.speed;

    // Calculate the angle of rotation
    const angle = Math.atan2(this.dy, this.dx) * (180 / Math.PI);

    // Update the position and rotation of the bullet element
    this.element.style.left = this.xPosition + "px";
    this.element.style.top = this.yPosition + "px";
    this.element.style.transform = `rotate(${angle}deg)`;
  }

  startAnimation(){
    
  }
}
