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
    animationFrames,
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

    this.animationFrames = animationFrames;

    this.animationState = "idle";
    this.animationImagesIndex = 0;
    this.animationIntervalId = null;
    this.animationInterval = 1000 / 10;

    document.addEventListener(changeScene, (event) => {
      this.onDestroy();
    });

    document.addEventListener(freezeTime, (event) => {
      if (this instanceof Player) {
        return;
      }
      event.detail === false ? this.startAnimation() : this.stopAnimation();
    });
  }

  onDestroy() {
    this.stopAnimation();

    this.element?.parentNode.remove();
  }

  createGOElement(containerElement) {
    const divElement = document.createElement("div");
    const goElement = document.createElement("img");
    goElement.src = this.src;
    goElement.style.width = `${this.width}px`;
    goElement.style.height = `${this.height}px`;
    goElement.style.position = "absolute";
    goElement.style.left = `${this.xPosition}px`;
    goElement.style.top = `${this.yPosition}px`;
    goElement.classList.add(this.className);

    containerElement.appendChild(divElement);
    divElement.appendChild(goElement);

    this.element = goElement;
    if (this instanceof Player || this instanceof Enemy) {
      this.createHealthBar();
    }
    this.startAnimation();
  }

  createHealthBar() {
    const healthContainer = document.createElement("div");
    healthContainer.style.top = `${this.yPosition - 25}px`;
    healthContainer.style.left = `${this.xPosition - 20}px`;

    healthContainer.classList.add("health-box");
    healthContainer.innerHTML = `
      <div class="health-bar-red"></div>
      <div class="health-bar"></div>
    `;
    this.element.parentElement.appendChild(healthContainer);
    this.healthContainer = healthContainer;
  }

  updateHealthBar() {
    const healthPercentage = this.health;
    const healthBarRed = this.healthContainer.querySelector(".health-bar-red");
    const healthBar = this.healthContainer.querySelector(".health-bar");

    // Calculate the width of the health bars
    const redBarWidth = healthPercentage + "%";
    const greenBarWidth = healthPercentage + "%";

    // Apply width to health bars with transition
    healthBarRed.style.transition = "width 0.7s linear";
    healthBar.style.transition = "width 0.3s linear";
    healthBarRed.style.width = redBarWidth;
    healthBar.style.width = greenBarWidth;
  }

  takeDamage(damage) {
    // Apply armor reduction if needed
    const effectiveDamage = Math.max(damage - this.armor, 0);

    // Reduce enemy's health
    this.health -= effectiveDamage;
    this.updateHealthBar();
    if (this.health <= 0) {
      this.lives -= 1;
    }
  }

  moveGO(newX, newY) {
    this.xPosition = newX;
    this.yPosition = newY;

    // Update the position of the element
    if (this.element) {
      this.element.style.left = `${this.xPosition}px`;
      this.element.style.top = `${this.yPosition}px`;

      this.healthContainer.style.top = `${this.yPosition - 25}px`;
      this.healthContainer.style.left = `${this.xPosition - 20}px`;

      this.setFacingDirection();
    }
  }

  moveGOPosition(xPositionToMove, yPositionToMove) {
    this.dx = xPositionToMove - this.xPosition;
    this.dy = yPositionToMove - this.yPosition;

    // Normalize the direction vector
    const length = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    this.dx = this.dx / length;
    this.dy = this.dy / length;

    // Move the enemy towards the player
    const newX = this.xPosition + this.dx * this.speed;
    const newY = this.yPosition + this.dy * this.speed;

    // Call moveGO method from GameObject class
    this.moveGO(newX, newY);
  }

  setFacingDirection() {
    if (this.dx < 0) {
      this.element.style.transform = "scaleX(-1)"; // Flip horizontally
    } else if (this.dx > 0) {
      this.element.style.transform = "scaleX(1)"; // Reset to original scale
    }
  }

  setAnimationState(state) {
    // Check if the player is already firing
    const isFiring = this.animationState.includes("Fire");

    if (state === "idle") {
      this.isIdleFire = false;
      this.isWalkingFire = false;
    }

    if (isFiring && state === "Fire") {
      this.animationImagesIndex = 0;
      return;
    }

    if (this.isIdleFire || this.isWalkingFire) {
      return;
    }

    // Set the current animation state
    if (!isFiring && state === "Fire") {
      // If not already firing and transitioning to fire state, set animation state to "walkFire" or "idleFire" depending on the current state
      if (this.animationState === "walk") {
        state = "walkFire";
        this.isWalkingFire = true;
      } else if (this.animationState === "idle") {
        state = "idleFire";
        this.isIdleFire = true;
      }
    }

    if (state !== this.animationState) {
      this.animationState = state;
      this.animationImagesIndex = 0;
    }
  }

  startAnimation() {
    // Start the animation loop
    if (!this.animationIntervalId) {
      this.animationIntervalId = setInterval(() => {
        this.animate();
      }, this.animationInterval);
    }
  }

  stopAnimation() {
    // Stop the animation loop
    clearInterval(this.animationIntervalId);
    this.animationIntervalId = null;
  }

  animate() {
    const images = this.animationFrames[this.animationState]; // Get the array of images based on animationState

    this.animationImagesIndex = (this.animationImagesIndex + 1) % images.length;
    if (
      this.animationImagesIndex === 0 &&
      (this.isWalkingFire || this.isIdleFire)
    ) {
      this.isWalkingFire = false;
      this.isIdleFire = false;
      this.setAnimationState("idle");
      return;
    }

    // Update the src attribute of the existing img element
    this.element.src = images[this.animationImagesIndex];

    return false; // Indicate that animation is not finished yet
  }
}
