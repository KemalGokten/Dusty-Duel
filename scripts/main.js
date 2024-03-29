const startButtonClass = ".start-button";

//Scene variables as classes and id elements
const gameContainer = "game-container";
const startPage = "start-page";
const townContainer = "town-container";
const levelContainer = "level1-container";

//Dispatch events variables
const loadingCompleteEvent = "loadingComplete";
const changeScene = "changeScene";
const freezeTime = "frezeeTime";

//DOM Elements
let popupContainer;
let revolverAudio;

//Class Objects

let gameHandler;
//Custom method to dispatch events
function dispatchCustomEvent(customEventName, data) {
  const customEvent = new CustomEvent(customEventName, {
    detail: data,
  });
  document.dispatchEvent(customEvent);
}

//Custom method to generate random value between min and max
function getRandomValue(minValue, maxValue) {
  // Generate a random number between 0 (inclusive) and 1 (exclusive)
  const randomNumber = Math.random();

  // Scale the random number to the range between 200 and 675
  const randomValue = minValue + randomNumber * (maxValue - minValue);

  // Round the random value to an integer (optional)
  const roundedRandomValue = Math.round(randomValue);

  return roundedRandomValue;
}

document.addEventListener("DOMContentLoaded", () => {
  popupContainer = document.getElementById("popupContainer");
  const backgroundMusic = document.getElementById("background-music");
  revolverAudio = document.getElementById("revolver-sound");
  
  backgroundMusic.volume = 0.6;
  revolverAudio.volume = 0.8

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
  const sceneHandler = new SceneHandler(sceneObjects);
  gameHandler = new GameHandler(sceneObjects);

  const agreeButton = document.getElementById("agree-button");
  const agreeCheckbox = document.getElementById("agree-checkbox");

  // Add event listener to the agree button
  agreeButton.addEventListener("click", function () {
    // Check if the checkbox is checked
    if (agreeCheckbox.checked) {
      // Close the popup container
      popupContainer.style.display = "none";
      
      backgroundMusic.play();
    } else {
      // If the checkbox is not checked, show an alert or perform other actions
      alert(
        "Please agree to the terms and conditions or you won't be able to play the game."
      );
    }
  });

  document.querySelector(startButtonClass).addEventListener("click", () => {
    dispatchCustomEvent(changeScene, [gameContainer, townContainer]);
  });
});
