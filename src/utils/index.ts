/**
 * Utility functions for the 15 Puzzle game.
 */

/**
 * Counts the number of inversions in the given array.
 * @param array An array of numbers representing the puzzle tiles.
 * @returns The number of inversions in the array.
 * @note An inversion occurs when a higher-numbered tile precedes a lower-numbered tile, excluding the blank tile represented by 16.
 */
const countInversions = (array: number[]): number => {
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
 * @param array An array of numbers representing the puzzle tiles.
 * @returns The row position of the empty tile from the bottom (1-indexed).
 */
const findEmptyRowFromBottom = (array: number[]): number => {
  const index = array.indexOf(16);
  return 4 - Math.floor(index / 4);
};

/**
 * Determines whether the given puzzle configuration is solvable.
 * @param array An array of numbers representing the puzzle tiles.
 * @returns `true` if the puzzle is solvable, `false` otherwise.
 * @note The solvability of the puzzle depends on the parity of the number of inversions and the row position of the empty tile from the bottom.
 */
export const isSolvable = (array: number[]): boolean => {
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
 * @param forceUnsolvable If `true`, forces the generation of an unsolvable puzzle.
 * @returns An array of objects representing the shuffled puzzle tiles, each containing a value and an index.
 * @note The function generates a random configuration of the puzzle tiles and checks if it is solvable using the `isSolvable` function.
 * If `forceUnsolvable` is `true`, it continues to generate configurations until an unsolvable puzzle is obtained.
 */
export const shuffle = (
  forceUnsolvable = false
): { value: number; index: number }[] => {
  let array;
  do {
    array = new Array(16)
      .fill(0)
      .map((_, i) => i + 1)
      .sort(() => Math.random() - 0.5);
  } while (isSolvable(array) === forceUnsolvable);

  return array.map((x, i) => ({ value: x, index: i }));
};

/**
 * Finds the next move to solve the 15 Puzzle game.
 * @param numbers The array representing the current state of the puzzle.
 * @returns The tile object representing the next move.
 */
export const findNextMove = (
  numbers: { value: number; index: number }[]
): { value: number; index: number } | null => {
  const emptyIndex = numbers.findIndex((n) => n.value === 16);
  const moves = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];

  for (const move of moves) {
    const nextIndex = emptyIndex + move.x + move.y * 4;
    if (nextIndex >= 0 && nextIndex < 16) {
      const nextTile = numbers[nextIndex];
      if (
        Math.abs((emptyIndex % 4) - (nextIndex % 4)) +
          Math.abs(Math.floor(emptyIndex / 4) - Math.floor(nextIndex / 4)) ===
        1
      ) {
        return nextTile;
      }
    }
  }

  return null;
};
