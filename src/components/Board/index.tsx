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
import { solvePuzzle } from "../../utils/puzzleSolver";
import PuzzleWorker from "./worker?worker";

interface PuzzleTile {
  value: number;
  index: number;
}

const Board: React.FC = () => {
  // State variables
  const [numbers, setNumbers] = useState<PuzzleTile[]>([]); // Array of objects representing puzzle tiles
  const [animating, setAnimating] = useState(false); // Animation state
  const [solvable, setSolvable] = useState(true); // Solvability state
  const [modalOpen, setModalOpen] = useState(false); // Modal state

  const [solution, setSolution] = useState<PuzzleTile[]>([]);
  const [solutionStep, setSolutionStep] = useState(0);


  /**
   * Resets the game board by shuffling the tiles.
   * If the puzzle is unsolvable, it opens the modal to notify the user.
   * If solvable, computes the solution sequence using the A* algorithm.
   */
  const reset = () => {
    const forceUnsolvable = Math.random() < 0.1;
    const newNumbers = shuffle(forceUnsolvable);
    setNumbers(newNumbers);
    const solvable = isSolvable(newNumbers.map((num) => num.value));
    setSolvable(solvable);
    if (!solvable) {
      setModalOpen(true);
    } else {
      const initialState = newNumbers.map((num) => num.value);
      const worker = new PuzzleWorker();
      worker.postMessage(initialState);
      worker.onmessage = function (e: any) {
        setSolution(e.data);
        setSolutionStep(0);
        worker.terminate();
      };
    }
  };

  /**
   * Moves the specified tile if it's adjacent to the empty space and animation is not in progress.
   * @param {Object} tile The tile object to be moved.
   */
  const moveTile = (tile: PuzzleTile) => {
    const emptyTile = numbers.find((n) => n.value === 16);
    if (!emptyTile) return;
  
    const i16 = emptyTile.index;
    const tileIndex = tile.index;
  
    // Calculate the valid positions for adjacency
    const adjacentPositions = [
      i16 - 1, // left
      i16 + 1, // right
      i16 - 4, // above
      i16 + 4  // below
    ];
  
    // Ensure the move is valid and the tile is adjacent to the empty space
    const isValidMove = adjacentPositions.includes(tileIndex);
    const isAnimating = animating;
  
    if (!isValidMove || isAnimating) return;
  
    // Swap the empty tile with the current tile
    const newNumbers = numbers.map((number) => {
      if (number.index === i16) return { ...number, index: tileIndex };
      if (number.index === tileIndex) return { ...number, index: i16 };
      return number;
    });
  
    setAnimating(true);
    setNumbers(newNumbers);
    setTimeout(() => setAnimating(false), 200);
  };
  
  

  /**
   * Handles keyboard input for arrow key navigation.
   * @param {Event} e The keydown event object.
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    const i16 = numbers.find((n) => n.value === 16)?.index; // Index of the empty tile
    if (i16 === undefined) return;

    // Move tile based on arrow key pressed
    if (e.key === "ArrowLeft" && !(i16 % 4 === 3))
      moveTile(numbers.find((n) => n.index === i16 + 1)!);
    else if (e.key === "ArrowUp" && !(i16 > 11))
      moveTile(numbers.find((n) => n.index === i16 + 4)!);
    else if (e.key === "ArrowRight" && !(i16 % 4 === 0))
      moveTile(numbers.find((n) => n.index === i16 - 1)!);
    else if (e.key === "ArrowDown" && !(i16 < 4))
      moveTile(numbers.find((n) => n.index === i16 - 4)!);
  };

  /**
   * Provides a hint by moving the next tile in the solution sequence.
   */
  const helpMe = () => {
    if (solutionStep < solution.length) {
      moveTile(solution[solutionStep]);
      setSolutionStep((prev) => prev + 1);
    }
  };

  // Register and unregister keydown event listener for keyboard input handling
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [numbers]);

  // Initialize the game board on component mount
  useEffect(reset, []);

  return (
    <div className="game">
      {/* Game board */}
      <div className="board">
        <Overlay size={16} />
        {/* Render tiles */}
        {numbers.map((x, i) => (
          <Tile key={i} number={x} moveTile={moveTile} />
        ))}
      </div>
      {/* Shuffle button and help button */}
      <div className="wrapper">
        <Shuffle reset={reset} />
        <HelpMe nextMove={helpMe} />
      </div>
      {/* Modal for unsolvable puzzle notification */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Board;
