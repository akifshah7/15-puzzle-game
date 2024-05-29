# 15 Puzzle Game

The 15 Puzzle Game is a classic sliding puzzle where the goal is to arrange numbered tiles in ascending order within a grid by sliding them into the empty space. This repository contains a JavaScript implementation of the 15 Puzzle Game along with utility functions to assist in solving it.

## Features

- **Playable Interface:** A graphical user interface (GUI) allows users to interactively play the 15 Puzzle Game by sliding tiles.
- **Shuffle Functionality:** The game includes a shuffle button to randomize the initial configuration of tiles.
- **Solvability Check:** Utility functions are provided to check if a given configuration of the puzzle is solvable.
- **Responsive Design:** The game interface is designed to be responsive and adapts to different screen sizes.

## Getting Started

To get started with the 15 Puzzle Game, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd 15-puzzle-game`
3. Install dependencies: `npm install` or `yarn install`
4. Start the development server: `npm run dev` or `yarn dev`
5. Open your browser and go to `http://localhost:3000` to play the game.

## How to Play

1. Click on the shuffle button to randomize the initial configuration of tiles.
2. Use the arrow keys or swipe gestures to slide the tiles into the empty space.
3. Continue sliding tiles until they are arranged in numerical order from 1 to 15, with the blank tile in the bottom right corner.

## Folder Structure

- **src:** Contains the source code for the 15 Puzzle Game.
  - **components:** React components for the game interface.
  - **utils:** Utility functions for shuffling tiles and checking solvability.
- **public:** Static assets and HTML template for the game.

## Credits

The 15 Puzzle Game is based on the classic sliding puzzle concept. This implementation was created by [Your Name] and is licensed under the [MIT License](LICENSE).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
