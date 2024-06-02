import { solvePuzzle } from "./utils/puzzleSolver";

self.onmessage = function (e) {
  const initialState = e.data;
  const solutionMoves = solvePuzzle(initialState);
  self.postMessage(solutionMoves);
};
