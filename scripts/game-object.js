class GameObject {
  constructor({
    health = 0,
    damage = 0,
    armor = 0,
    speed = 0,
    lives = 1,
    src = "",
    xPosition = 0,
    yPosition = 0,
    width = 0,
    height = 0,
    className = "",
  }) {
    this.health = health;
    this.damage = damage;
    this.armor = armor;
    this.lives = lives;
    this.speed = speed;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.src = src;
    this.width = width;
    this.height = height;
    this.className = className;

    document.addEventListener(changeScene, (event) => {
        this.onDestroy();
      });
  }

  createGOElement(containerElement) {
    const goElement = document.createElement("img");
    goElement.src = this.src;
    goElement.style.width = `${this.width}px`;
    goElement.style.height = `${this.height}px`;
    goElement.style.position = "absolute";
    goElement.style.left = `${this.xPosition}px`;
    goElement.style.top = `${this.yPosition}px`;
    goElement.classList.add(this.className);

    containerElement.appendChild(goElement);

    this.element = goElement;
  }

  moveGO(newX, newY) {
    this.xPosition = newX;
    this.yPosition = newY;

    // Update the position of the element
    if (this.element) {
      this.element.style.left = `${this.xPosition}px`;
      this.element.style.top = `${this.yPosition}px`;
    }
  }

  moveGOPosition(xPositionToMove,yPositionToMove){
    const dx = xPositionToMove - this.xPosition;
    const dy = yPositionToMove - this.yPosition;

    // Normalize the direction vector
    const length = Math.sqrt(dx * dx + dy * dy);
    const directionX = dx / length;
    const directionY = dy / length;

    // Move the enemy towards the player
    const newX = this.xPosition + directionX * this.speed;
    const newY = this.yPosition + directionY * this.speed;

    // Call moveGO method from GameObject class
    this.moveGO(newX, newY);
  }

  onDestroy(){
    this.element?.remove();
  }
}
