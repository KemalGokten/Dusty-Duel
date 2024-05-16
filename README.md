# Dusty Duel

[Play Dusty Duel now!](https://kemalgokten.github.io/Dusty-Duel/)

## Description

Dusty Duel is an exhilarating western-themed game where players engage in epic shootouts, upgrade their skills, and navigate through various challenging levels. Set in the rugged frontier, players must outgun their opponents and emerge victorious in thrilling duels.

## Main Functionalities

- Player movement and shooting mechanics
- Enemy AI with basic combat behavior
- Health and ammo management
- Level progression and scene transitions
- Basic sound effects and background music

## Backlog

- Additional enemy types and behaviors
- Advanced weapon and skill upgrades
- Interactive environments and obstacles
- Leaderboards and scoring system
- Expanded sound effects and music selection

## Technologies Used

- HTML
- CSS
- JavaScript
- DOM Manipulation
- Audio and image loading

## States and Transitions

- Start Screen
- Town Scene
- Level Scenes
- Game Over Screen

## Project Structure

### `main.js`

- `buildDom()`
- `main()`
- `createSplashScreen()`
- `removeSplashScreen()`
- `createGameScreen()`
- `removeGameScreen()`
- `createGameOverScreen()`
- `removeGameOverScreen()`
- `startGame()`
- `gameOver()`

### `Game.js`

- `Game()`
- `gameLoop()`
- `createEnemies()`
- `checkCollisions()`
- `updateGameStatus()`
- `gameOver()`

### `Player.js`

- `Player()`
- `handleInput()`
- `updatePlayerPosition()`
- `shoot()`

### `Enemy.js`

- `Enemy()`
- `updateEnemyPosition()`
- `checkPlayerCollision()`

### `Bullet.js`

- `Bullet()`
- `updateBulletPosition()`
- `checkBulletCollision()`

## Task

1. Implement player movement and shooting mechanics
2. Create basic enemy AI and combat behavior
3. Integrate health and ammo management systems
4. Develop level progression and scene transitions
5. Add sound effects and background music
6. Test and debug game mechanics
7. Polish user interface and visual effects
8. Deploy the game for testing and feedback

## Links

- [Github repository Link](https://kemalgokten.github.io/game-project/)
- [Deployment Link](https://kemalgokten.github.io/game-project/)
