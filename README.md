## Jogger

[Live version](https://msucorey.github.io/jogger/)

### Background

Jogger is a humorous take on the arcade classic **Frogger** that was also released for numerous home entertainment systems, probably most memorably the Atari 2600.  The original game of Frogger had the player guide a hapless frog from the bottom of the screen to the top of the screen first dodging cars across several lanes of traffic and then a wide river jumping from log to log (or alligator!).

Jogger is similar in that the idea is to avoid getting "splatted" by cars and other obstacles, but is also akin to **Pac-Man** in that the navigation isn't from top to bottom, but through a maze.

In **Frogger** the goal was a destination while in **Pac-Man** it was to clear the board of pellets.  In **Jogger**, the goal will be to finish a run of a specified distance (i.e. move and stay alive).  

### Play Instructions

As explained in the in-game popup (modal), the goal is to navigate the jogger using the arrow directional keys and survive as long as possible without getting hit by a bus.

Each run is completed after going the distance specified in the game display.  The user then "levels up" to start a subsequent run of greater distance and slightly faster buses.

The user quickly discovers that the game is more difficult than it otherwise appears as the buses increase speed every time they wrap around off screen.  Additionally, when buses collide with each other, they simply reverse direction and keep going, catching joggers by surprise(!).

### Description

In Jogger, users can:

- [ ] Start a new game and take control of the "Jogger"
- [ ] Navigate the jogger around the city
- [ ] Be presented with "permadeath" obstacles
- [ ] Complete subsequent runs of increasing length and difficulty

In addition, users will enjoy:

- [ ] A high fidelity soundtrack from Rocky
- [ ] High resolution graphics

### Wireframe

The app was envisioned to consist of a single screen with game board, game controls, and nav links to the author's Github and LinkedIn profiles.  Game controls would include a Start button and keyboard directional controls to move the jogger.  The main view would be a city or neighborhood organized into blocks and very reminiscent of a **Pac-Man** layout.

![wireframes](/docs/wireframe.png)

Ultimately, this vision evolved into a more advanced interface to include audio controls and presentation of more information to the user.

![screenshot](/docs/screenshot.png)

### Architecture and Technologies

This project was implemented with the following technologies:

- Object-oriented JavaScript and `jQuery` for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be several scripts involved in this project:

`game_view.js`: Stores a `Game` instance and a `canvas` context the game renders into.

`game.js`: Master file synchronizing all other elements of a game instance.

`jogger.js`: The element the player controls and navigates around obstacles.

`moving_object.js`: The parent class for moving obstacles such as `Cars` and `Buses`.

`static_object.js`: The parent class for static obstacles such as `Building`, `Construction`, and `Goodies`.

### Key Implementation Details

Game logic is relatively straight forward with exeception of the collision algorithms.

First, since every object in the game is a rectangle, a simple rectangle intersection check is performed to see if any two objects collide.
```JavaScript
return upperLeftInside || upperRightInside || lowerLeftInside || lowerRightInside;
```

Next, given a collision, behavior is dependent on the specific class of objects involved.  In the current version of the game, there are only three types of collision:
- Jogger / Bus
- Jogger / Building
- Bus / Bus

Buses have fixed trajectories that avoid Buildings, but future versions of the game might allow otherwise(!) - perhaps on higher levels of difficulty.

### Planned Features

There are many directions this game could eventually go.  Some anticipated updates are:

- [ ] Have bonus goodies appear (akin to fruit in **Pac-Man**)
- [ ] Have power-ups available giving the jogger extra speed or damage resistance

README
xxxLink to live version
xxxInstructions on how to play/use the project
xxxList of techs/languages/plugins/APIs used
xxxTechnical implementation details for anything worth mentioning
xxxBasically anything you had to stop and think about before building
xxxCode snippets for these (make sure it looks good)
xxxTo-dos/future features
xxxNo .DS_Stores
xxxOrganize into /assets and /lib
