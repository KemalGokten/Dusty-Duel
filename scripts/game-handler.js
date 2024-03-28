class GameHandler {
  constructor(sceneObjects) {
    this.npcs = [];
    this.npcPositions;
    this.player = null;
    this.sceneObjects = sceneObjects;
    this.bullets = [];
    this.goldCount = 0;

    this.keydownListener = this.keydownListener.bind(this);
    this.keyupListener = this.keyupListener.bind(this);
    this.mouseDown = this.leftClickListener.bind(this);

    this.selectLevel = this.selectLevel.bind(this);

    this.addLevelSelectionListeners();

    this.frameCounter = 0;
    this.awake();
  }

  awake() {
    this.createPlayerObject();

    document.addEventListener(loadingCompleteEvent, (event) => {
      this.containerElement = this.sceneObjects[event.detail].element;
      this.currentLevel = this.sceneObjects[event.detail].level;

      if (event.detail === townContainer) {
        this.createNpcscontainerElement();
        this.selectedLevel = null;
        this.isDoorOpen = false;
      } else {
        this.Enemies = new Enemies(this.currentLevel, this.player);
        document.addEventListener("mousedown", this.mouseDown);
        this.isDoorOpen = true;
      }

      this.onStart();
    });

    document.addEventListener(changeScene, (event) => {
      this.onStop();
    });
  }

  onStart() {
    this.player.createGOElement(this.containerElement);
    this.magazine = this.player.magazine;

    this.keyState = {
      w: false,
      s: false,
      a: false,
      d: false,
    };
    this.updatePlayerMovement();

    this.createDoor();

    this.startListeningKeys();
    this.updateInterval = setInterval(() => {
      this.update();
    }, 1000 / 60);
  }

  onStop() {
    this.stopListeningKeys();
    clearInterval(this.updateInterval);
    this.updateInterval = null;

    this.Enemies = null;
    this.npcs = [];
    this.bullets = [];
  }

  update() {
    if (!this.freezeTime) {
      this.updateBullets();
      this.checkDoorCollision();

      this.createEnemy();

      if (this.Enemies) {
        let i = 0;
        while (i < this.Enemies?.enemies.length) {
          const enemy = this.Enemies.enemies[i];
          enemy.chasePlayer(this.player.xPosition, this.player.yPosition);
          const isColliding = this.checkCollision(
            enemy.element,
            this.player.element
          );
          if (this.frameCounter % 60 === 0 && isColliding) {
            this.player.takeDamage(enemy.damage);
          }
          enemy.shouldMove = !isColliding;
          i++;
        }
      }
    }

    this.checkNpcCollisions();

    if (this.shouldPlayerMove) {
      // Set the movement direction in the player object
      this.player.movePlayer();
    }

    this.frameCounter++;
  }

  createDoor() {
    // Create the door element
    const imgPath = this.isDoorOpen
      ? "../assets/images/door_images/door_opening0008@2x.png"
      : "../assets/images/door_images/door_opening0001@2x.png";
    this.door = new Door({ src: imgPath });
    this.door.createGOElement(this.containerElement);
  }
  checkDoorCollision() {
    // Retrieve the door element from the DOM using its class name
    const doorElement = document.querySelector(".door");

    // Get the position and dimensions of the door's bounding box
    const doorRect = doorElement.getBoundingClientRect();

    // Get the position and dimensions of the player's bounding box
    const playerRect = this.player.element.getBoundingClientRect();

    // Calculate the player's center position
    const playerCenterX = playerRect.left + playerRect.width / 2;

    // Check if the player's center is within the horizontal bounds of the door
    const isCenterInsideDoor =
      playerCenterX >= doorRect.left && // Player's center is to the right of the door's left edge
      playerCenterX <= doorRect.right; // Player's center is to the left of the door's right edge

    // Check if the player is fully inside the door vertically
    const isVerticallyInsideDoor =
      playerRect.bottom <= doorRect.bottom && // Player's bottom is above or at the door's bottom
      playerRect.top >= doorRect.top; // Player's top is below or at the door's top

    // If the player's center is within the door horizontally and the player is fully inside vertically, trigger scene change
    if (isCenterInsideDoor && isVerticallyInsideDoor) {
      if (this.currentLevel !== 0) {
        dispatchCustomEvent(changeScene, [gameContainer, townContainer]);
      } else if (this.selectedLevel) {
        dispatchCustomEvent(changeScene, [
          gameContainer,
          `${this.selectedLevel}`,
        ]);
      }
    }
  }

  createNpcscontainerElement() {
    for (let npcObject of npcList) {
      const npc = new Npc({
        src: npcObject.src,
        width: npcObject.width,
        height: npcObject.height,
        xPosition: npcObject.xPosition,
        yPosition: npcObject.yPosition,
        className: npcObject.className,
        id: npcObject.id,
        animationFrames: npcAnimationFrames,
      });

      npc.createGOElement(this.containerElement);
      this.npcs.push(npc);
    }
  }

  checkCollision(element1, element2) {
    // Get the position and dimensions of the first object's bounding box
    const rect1 = element1.getBoundingClientRect();

    // Get the position and dimensions of the second object's bounding box
    const rect2 = element2.getBoundingClientRect();

    // Check for collision between the two objects
    if (
      rect1.left + rect1.width / 2 < rect2.right &&
      rect1.right - rect1.width / 2 > rect2.left &&
      rect1.top + rect1.height / 2 < rect2.bottom &&
      rect1.bottom - rect1.height / 2 > rect2.top
    ) {
      // Collision detected between the two objects
      // Handle collision logic here
      return true;
    }

    return false;
  }

  createEnemy() {
    if (this.Enemies && this.frameCounter % 100 === 0) {
      this.Enemies.createEnemy(this.containerElement);
    }
  }

  createPlayerObject() {
    const player = new Player({
      src: playerObject.src,
      width: playerObject.width,
      height: playerObject.height,
      xPosition: playerObject.xPosition,
      yPosition: playerObject.yPosition,
      className: playerObject.className,
      animationFrames: playerAnimationFrames,
      magazine : playerObject.magazine,
    });
    this.player = player;
  }

  updatePlayerMovement() {
    // Calculate the combined movement direction based on the key states
    let dx = (this.keyState["d"] ? 1 : 0) - (this.keyState["a"] ? 1 : 0);
    let dy = (this.keyState["s"] ? 1 : 0) - (this.keyState["w"] ? 1 : 0);

    if (dx !== 0 || dy !== 0) {
      this.shouldPlayerMove = true;
      this.player.setAnimationState("walk");
    } else {
      this.shouldPlayerMove = false;
      this.player.setAnimationState("idle");
    }

    // Set the movement direction in the player object
    this.player.setMovement(dx, dy);
  }

  startListeningKeys() {
    document.addEventListener("keydown", this.keydownListener);
    document.addEventListener("keyup", this.keyupListener);
  }

  stopListeningKeys() {
    document.removeEventListener("keydown", this.keydownListener);
    document.removeEventListener("keyup", this.keyupListener);
    document.removeEventListener("mousedown", this.mouseDown);
  }

  keydownListener(event) {
    const movementKeys = ["w", "s", "a", "d"];
    if (movementKeys.includes(event.key)) {
      event.preventDefault();
      this.keyState[event.key] = true;
      this.updatePlayerMovement();
    } else if (event.key === "r") {
      this.reloadMagazine();
    }
  }

  keyupListener(event) {
    const movementKeys = ["w", "s", "a", "d"];
    if (movementKeys.includes(event.key)) {
      event.preventDefault();
      this.keyState[event.key] = false;
      this.updatePlayerMovement();
    }

    if (event.key === " ") {
      this.freezeTime = !this.freezeTime;
      dispatchCustomEvent(freezeTime, this.freezeTime);
    }
  }

  leftClickListener(event) {
    if (this.magazine <= 0) {
      return;
    }
    if (event.button === 0 && !this.freezeTime) {
      const cursorX = event.clientX;
      const cursorY = event.clientY;

      const dx = cursorX - this.player.xPosition;
      const dy = cursorY - this.player.yPosition;

      const length = Math.sqrt(dx * dx + dy * dy);
      const directionX = dx / length;
      const directionY = dy / length;

      const bullet = new Bullet({
        xPosition: this.player.xPosition,
        yPosition: this.player.yPosition,
        dx: directionX,
        dy: directionY,
      });
      bullet.createGOElement(this.containerElement);
      this.bullets.push(bullet);
      this.magazine -= 1;

      this.player.setAnimationState("Fire");
    }
  }

  reloadMagazine() {
    this.magazine = this.player.magazine;
  }
  updateBullets() {
    this.bullets.forEach((bullet, index) => {
      bullet.moveBullet();

      // Check collision with enemies
      this.Enemies.enemies.forEach((enemy, enemyIndex) => {
        if (this.checkCollision(bullet.element, enemy.element)) {
          // Collision detected, remove the bullet and damage the enemy
          bullet.onDestroy();
          this.bullets.splice(index, 1);
          enemy.takeDamage(bullet.damage);

          // If the enemy is destroyed, remove it from the array and DOM
          if (enemy.health <= 0) {
            enemy.onDestroy();
            this.Enemies.enemies.splice(enemyIndex, 1);
            this.goldCount += 10;
            this.updateGoldCount();
          }
        }
      });

      // Remove bullets that go off-screen
      if (
        bullet.xPosition < 0 ||
        bullet.xPosition > window.innerWidth ||
        bullet.yPosition < 0 ||
        bullet.yPosition > window.innerHeight
      ) {
        bullet.onDestroy();
        this.bullets.splice(index, 1);
      }
    });
  }

  updateGoldCount() {
    document.getElementById("goldCount").textContent = this.goldCount;
  }

  checkNpcCollisions() {
    const { newX, newY } = this.player.calculateNextFrameMove();

    let collidesWithNpc = false;

    // Check collision with each NPC
    for (let npc of this.npcs) {
      const npcRect = npc.element.getBoundingClientRect();
      if (
        newX < npcRect.right &&
        newX + this.player.width > npcRect.left &&
        newY < npcRect.bottom &&
        newY + this.player.height > npcRect.top
      ) {
        // Collision detected with at least one NPC
        collidesWithNpc = true;
        if (npc.id === "LevelNpc" && !this.isDoorOpen && !this.freezeTime) {
          this.showLevelSelectionUI();
        }
        break; // No need to check further collisions
      }
    }

    if (this.shouldPlayerMove && !collidesWithNpc) {
      this.hideLevelSelectionUI();
    }

    // Set player movement availability based on collision status
    this.player.setPlayerMovementAvailability(!collidesWithNpc);
  }

  addLevelSelectionListeners() {
    // Get references to the level selection buttons
    const levelButtons = document.querySelectorAll(
      ".level-selection-container button"
    );

    // Add event listener to each level selection button
    levelButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const level = event.target.dataset.level; // Assuming level information is stored in data-level attribute
        this.selectLevel(level);
      });
    });
  }

  showLevelSelectionUI() {
    var levelSelectionUI = document.getElementById("level-selection");
    if (levelSelectionUI) {
      levelSelectionUI.classList.remove("hidden");
    }
  }

  hideLevelSelectionUI() {
    var levelSelectionUI = document.getElementById("level-selection");
    if (levelSelectionUI) {
      levelSelectionUI.classList.add("hidden");
    }
  }

  // Function to select a level
  selectLevel(level) {
    this.selectedLevel = level;

    this.door.openDoorAnimation();
    this.isDoorOpen = true; // Set to true to prevent re-triggering the animation

    this.hideLevelSelectionUI();
  }
}
