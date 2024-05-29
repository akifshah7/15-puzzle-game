/**
 * Utility functions for the 15 Puzzle game.
 */

/**
 * Counts the number of inversions in the given array.
 * @param {number[]} array An array of numbers representing the puzzle tiles.
 * @returns {number} The number of inversions in the array.
 * @note An inversion occurs when a higher-numbered tile precedes a lower-numbered tile, excluding the blank tile represented by 16.
 */
const countInversions = (array) => {
  let inversions = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j] && array[i] !== 16 && array[j] !== 16) {
        inversions++;
      }
    }
  }
  return inversions;
};

/**
 * Finds the row position of the empty tile (represented by 16) from the bottom of the puzzle grid.
 * @param {number[]} array An array of numbers representing the puzzle tiles.
 * @returns {number} The row position of the empty tile from the bottom (1-indexed).
 */
const findEmptyRowFromBottom = (array) => {
  const index = array.indexOf(16);
  return 4 - Math.floor(index / 4);
};

/**
 * Determines whether the given puzzle configuration is solvable.
 * @param {number[]} array An array of numbers representing the puzzle tiles.
 * @returns {boolean} `true` if the puzzle is solvable, `false` otherwise.
 * @note The solvability of the puzzle depends on the parity of the number of inversions and the row position of the empty tile from the bottom.
 */
export const isSolvable = (array) => {
  const inversions = countInversions(array);
  const emptyRowFromBottom = findEmptyRowFromBottom(array);
  if (array.length % 2 === 0) {
    return emptyRowFromBottom % 2 === 0
      ? inversions % 2 !== 0
      : inversions % 2 === 0;
  } else {
    return inversions % 2 === 0;
  }
};

/**
 * Shuffles the puzzle tiles to generate a new solvable configuration.
 * @param {boolean} [forceUnsolvable=false] If `true`, forces the generation of an unsolvable puzzle.
 * @returns {Object[]} An array of objects representing the shuffled puzzle tiles, each containing a value and an index.
 * @note The function generates a random configuration of the puzzle tiles and checks if it is solvable using the `isSolvable` function.
 * If `forceUnsolvable` is `true`, it continues to generate configurations until an unsolvable puzzle is obtained.
 */
export const shuffle = (forceUnsolvable = false) => {
  let array;
  do {
    array = new Array(16)
      .fill()
      .map((_, i) => i + 1)
      .sort(() => Math.random() - 0.5);
  } while (isSolvable(array) === forceUnsolvable);

  return array.map((x, i) => ({ value: x, index: i }));
};
