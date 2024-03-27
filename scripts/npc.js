class Npc extends GameObject {
  constructor({
    src,
    xPosition = 0,
    yPosition = 0,
    width = 0,
    height = 0,
    className,
    id = null,
  }) {
    super({
      src,
      xPosition,
      yPosition,
      width,
      height,
      className,
    });
    
    this.id = id; 
  }
}

const npcList = [
  {
    src: "../assets/images/bro5_idle0002@2x.png",
    width: 125,
    height: 125,
    xPosition: 25,
    yPosition: 200,
    transform: "",
    className: "npc",
  },
  {
    src: "../assets/images/bro5_idle0002@2x.png",
    width: 125,
    height: 125,
    xPosition: 125,
    yPosition: 675,
    transform: "",
    className: "npc",
  },
  {
    src: "../assets/images/bro5_idle0002@2x.png",
    width: 125,
    height: 125,
    xPosition: 1200,
    yPosition: 200,
    transform: "scaleX(-1)",
    className: "npc",
    id: "LevelNpc"
  },
  {
    src: "../assets/images/bro5_idle0002@2x.png",
    width: 125,
    height: 125,
    xPosition: 1582,
    yPosition: 550,
    transform: "scaleX(-1)",
    className: "npc",
  },
];

class Door extends GameObject {
  constructor({
    src = "../assets/images/door_opening0008@2x.png",
    xPosition = 875,
    yPosition = 150,
    width = 100,
    height = 200,
    className = "door",
  }) {
    super({
      src,
      xPosition,
      yPosition,
      width,
      height,
      className,
    });

    this.imagePaths = [
      "../assets/images/door_images/door_opening0001@2x.png",
      "../assets/images/door_images/door_opening0002@2x.png",
      "../assets/images/door_images/door_opening0003@2x.png",
      "../assets/images/door_images/door_opening0004@2x.png",
      "../assets/images/door_images/door_opening0005@2x.png",
      "../assets/images/door_images/door_opening0006@2x.png",
      "../assets/images/door_images/door_opening0007@2x.png",
      "../assets/images/door_images/door_opening0008@2x.png",
    ];
  }

  openDoorAnimation() {
    return new Promise((resolve, reject) => {
      const animationInterval = 100; // Interval between image changes in milliseconds
      let currentIndex = 0;
      const animationElement = this.element;
  
      const animateFrame = () => {
        currentIndex++;
        if (currentIndex < this.imagePaths.length) {
          animationElement.src = this.imagePaths[currentIndex];
          setTimeout(animateFrame, animationInterval);
        } else {
          resolve(true); // Resolve the Promise when the animation is complete
        }
      };
  
      // Start the animation loop
      animateFrame();
    });
  }
  
}
