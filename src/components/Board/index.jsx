/**
 * Board Component
 *
 * The Board component represents the game board for the 15 Puzzle game. It manages the state of the game,
 * including the arrangement of tiles, animations, and solvability checks.
 */

import { useEffect, useState } from "react";
import "./index.css";
import Tile from "../Tile";
import Overlay from "../Overlay";
import Shuffle from "../Shuffle";
import Modal from "../Modal";
import HelpMe from "../HelpMe";
import { isSolvable, shuffle } from "../../utils";

const Board = () => {
  // State variables
  const [numbers, setNumbers] = useState([]); // Array of objects representing puzzle tiles
  const [animating, setAnimating] = useState(false); // Animation state
  const [solvable, setSolvable] = useState(true); // Solvability state
  const [modalOpen, setModalOpen] = useState(false); // Modal state

  /**
   * Resets the game board by shuffling the tiles. If the puzzle is unsolvable,
   * it opens the modal to notify the user.
   */
  const reset = () => {
    // Randomly decide if the puzzle should be unsolvable
    const forceUnsolvable = Math.random() < 0.1;
    const newNumbers = shuffle(forceUnsolvable); // Shuffle the tiles
    setNumbers(newNumbers); // Update the state with shuffled tiles
    setSolvable(isSolvable(newNumbers.map((num) => num.value))); // Check solvability
    if (!solvable) {
      setModalOpen(true); // Open modal if puzzle is unsolvable
    }
  };

  /**
   * Moves the specified tile if it's adjacent to the empty space and animation is not in progress.
   * @param {Object} tile The tile object to be moved.
   */
  const moveTile = (tile) => {
    const i16 = numbers.find((n) => n.value === 16).index; // Index of the empty tile
    // Check if the tile is adjacent to the empty space and animation is not in progress
    if (![i16 - 1, i16 + 1, i16 - 4, i16 + 4].includes(tile.index) || animating)
      return;

    // Move the tile
    const newNumbers = [...numbers].map((number) => {
      if (number.index !== i16 && number.index !== tile.index) return number;
      else if (number.value === 16) return { value: 16, index: tile.index };
      return { value: tile.value, index: i16 };
    });
    // Update state and set animation flag
    setAnimating(true);
    setNumbers(newNumbers);
    setTimeout(() => setAnimating(false), 200); // Reset animation flag after 200ms
  };

  /**
   * Handles keyboard input for arrow key navigation.
   * @param {Event} e The keydown event object.
   */
  const handleKeyDown = (e) => {
    const i16 = numbers.find((n) => n.value === 16).index; // Index of the empty tile
    // Move tile based on arrow key pressed
    if (e.keyCode === 37 && !(i16 % 4 === 3))
      moveTile(numbers.find((n) => n.index === i16 + 1));
    else if (e.keyCode === 38 && !(i16 > 11))
      moveTile(numbers.find((n) => n.index === i16 + 4));
    else if (e.keyCode === 39 && !(i16 % 4 === 0))
      moveTile(numbers.find((n) => n.index === i16 - 1));
    else if (e.keyCode === 40 && !(i16 < 4))
      moveTile(numbers.find((n) => n.index === i16 - 4));
  };

  // Register and unregister keydown event listener for keyboard input handling
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  // Initialize the game board on component mount
  useEffect(reset, []);

  return (
    <div className="game">
      {/* Game board */}
      <div className="board">
        <Overlay size={16} />
        {/* Render tiles */}
        {numbers.map((x, i) => {
          return <Tile key={i} number={x} moveTile={moveTile} />;
        })}
      </div>
      {/* Shuffle button and help button */}
      <div className="wrapper">
        <Shuffle reset={reset} />
        <HelpMe />
      </div>
      {/* Modal for unsolvable puzzle notification */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Board;
