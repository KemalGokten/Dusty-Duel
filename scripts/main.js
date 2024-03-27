const startButtonClass = ".start-button";

//Scene variables as classes and id elements
const gameContainer = "game-container";
const startPage = "start-page";
const townContainer = "town-container";
const levelContainer = "level1-container";

//Dispatch events variables
const loadingCompleteEvent = "loadingComplete";
const changeScene = "changeScene";

//Class Objects

let gameHandler;
//Custom method to dispatch events
function dispatchCustomEvent(customEventName, data) {
  const customEvent = new CustomEvent(customEventName, {
    detail: data,
  });
  document.dispatchEvent(customEvent);
}

document.addEventListener("DOMContentLoaded", () => {
  const sceneObjects = {
    [startPage]: {
      element: document.getElementById(startPage),
      display: "flex",
    },
    [gameContainer]: {
      element: document.getElementById(gameContainer),
      display: "flex",
    },
    [townContainer]: {
      element: document.getElementById(townContainer),
      display: "flex",
      level: 0,
    },
    Level1: {
      element: document.getElementById("level1-container"),
      display: "flex",
      level: 1,
    },
    Level2: {
      element: document.getElementById("level2-container"),
      display: "flex",
      level: 2,
    },
    Level3: {
      element: document.getElementById("level3-container"),
      display: "flex",
      level: 3,
    },
  };
  gameHandler = new GameHandler(sceneObjects);
  const sceneHandler = new SceneHandler(sceneObjects);

  document.querySelector(startButtonClass).addEventListener("click", () => {
    dispatchCustomEvent(changeScene, [gameContainer, townContainer]);
  });
});
