## Jogger

### Background

Jogger is a humorous take on the arcade classic **Frogger** that was also released for numerous home entertainment systems, probably most memorably the Atari 2600.  The original game of Frogger had the player guide a hapless frog from the bottom of the screen to the top of the screen first dodging cars across several lanes of traffic and then a wide river jumping from log to log (or alligator!).

Jogger is similar in that the idea is to avoid getting "splatted" by cars and other obstacles, but is also akin to **Pac-Man** in that the navigation isn't from top to bottom, but through a maze.

In **Frogger** the goal was a destination while in **Pac-Man** it was to clear the board of pellets.  In **Jogger**, the goal will be to finish a run of a specified distance (i.e. move and stay alive).  

### Functionality & MVP  

With this game of Jogger, users will be able to:

- [ ] Start a new game and take control of the "Jogger"
- [ ] Navigate the jogger around the city
- [ ] Be presented with "permadeath" obstacles
- [ ] Complete subsequent runs of increasing length and difficulty

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production Readme

### Wireframe

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn,
and the About modal.  Game controls will include a Start button and keyboard directional controls to move the jogger.  The main view will be a city or neighborhood organized into blocks and very reminiscent of a **Pac-Man** layout.

![wireframes](/docs/wireframe.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Object-oriented JavaScript and `jQuery` for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be several scripts involved in this project:

`game_view.js`: Stores a `Game` instance and a `canvas` context the game renders into.

`game.js`: Master file synchronizing all other elements of a game instance.

`jogger.js`: The element the player controls and navigates around obstacles.

`moving_object.js`: The parent class for moving obstacles such as `Cars` and `Buses`.

`static_object.js`: The parent class for static obstacles such as `Building`, `Construction`, and `Goodies`.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 files outlined above.  Learn the basics of `HTML5 Canvas`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough about `HTML5 Canvas` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Canvas` API.  First, build out the individual element objects to connect to the `Board` object.  Then, use `game.js` to create and render at the basic game board.  Goals for the day:

- Get a static version of the game up and rendering
- Render a square grid to the `Canvas` using `Easel.js`
- Complete initial styling and color selection
- Find media for icon, music, and sound effects

**Day 3**: Build out the game logic in `game.js`.  Goals for the day:

- Transition the game from static to dynamic with a controllable jogger
- Diversify obstacle objects and make adjustments to speed and timing to increase variability of game difficulty


**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game start, reset, and navigation
- Have a styled `Canvas`, nice looking controls and title

### Bonus features

There are many directions this game could eventually go.  Some anticipated updates are:

- [ ] Have bonus goodies appear (akin to fruit in **Pac-Man**)
- [ ] Have power-ups available giving the jogger extra speed or damage resistance
