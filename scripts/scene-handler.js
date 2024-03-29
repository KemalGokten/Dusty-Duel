class SceneHandler {
  constructor(sceneObjects) {
    this.scenes = sceneObjects;
    this.currentScene = sceneObjects[startPage];
    this.awake();
  }

  awake() {
    document.addEventListener(changeScene, (event) => {
      this.changeScene(event.detail);
    });

    this.loadingMessages = [
      "Creating the scene...",
      "Initializing characters...",
      "Finalizing rendering...",
    ];

    this.loadingContainer = document.querySelector(".loading-container");
    this.loadingMessageElement = document.querySelector(".loading-message");
    this.progressBar = document.querySelector(".progress");
  }

  async changeScene(activateScenes) {
    this.currentScene.element.style.display = "none";
    await this.activateProgressBar();

    for(let sceneName in activateScenes){
      this.currentScene = this.scenes[activateScenes[sceneName]];
      this.currentScene.element.style.display = this.currentScene.display;
    }

    dispatchCustomEvent(loadingCompleteEvent, activateScenes[1]);

    //Remove if everything works with the above code
    // for (let key in this.scenes) {
    //   if (activateScenes.includes(key)) {
    //     this.scenes[key].element.style.display = this.scenes[key].display;
    //     this.currentScene = this.scenes[key];
    //   } else {
    //     this.scenes[key].element.style.display = "none";
    //   }
    //   

    // }
  }

  async activateProgressBar() {
    this.loadingContainer.style.display = "flex";

    for (let i = 0; i < this.loadingMessages.length; i++) {
      await this.loadProgressBar(this.loadingMessages[i], 1300);
    }

    this.clearLoadBarState();
  }

  async loadProgressBar(message, duration) {
    return new Promise((resolve) => {
      this.loadingMessageElement.textContent = message;
      this.progressBar.style.width = "0%";

      let progress = 0;
      const intervalId = setInterval(() => {
        progress += 100 / (duration / 100);
        this.progressBar.style.width = `${Math.min(progress, 100)}%`;

        if (progress >= 100) {
          clearInterval(intervalId);
          resolve();
        }
      }, 100);
    });
  }

  clearLoadBarState() {
    this.loadingContainer.style.display = "none";
    this.loadingMessageElement.textContent = "";
    this.progressBar.style.width = "0%";
  }
}
