import { MinPriorityQueue } from "@datastructures-js/priority-queue";

interface PuzzleTile {
  value: number;
  index: number;
}

interface Node {
  state: number[];
  moves: PuzzleTile[];
  cost: number;
  priority: number;
}

export const createPriorityQueue = () => {
  const pq = new MinPriorityQueue<Node>(({ priority }) => priority);
  return pq;
};

const manhattanDistance = (state: number[]): number => {
  let distance = 0;
  for (let i = 0; i < state.length; i++) {
    if (state[i] !== 16) {
      const correctPosition = state[i] - 1;
      distance += Math.abs(Math.floor(i / 4) - Math.floor(correctPosition / 4)) +
                  Math.abs(i % 4 - correctPosition % 4);
    }
  }
  return distance;
};

const linearConflict = (state: number[]): number => {
  let conflict = 0;
  for (let i = 0; i < 4; i++) {
    let maxInRow = -1;
    let maxInColumn = -1;
    for (let j = 0; j < 4; j++) {
      // Row conflicts
      const rowIndex = i * 4 + j;
      if (state[rowIndex] !== 16 && Math.floor((state[rowIndex] - 1) / 4) === i) {
        if (state[rowIndex] > maxInRow) {
          maxInRow = state[rowIndex];
        } else {
          conflict += 2;
        }
      }
      // Column conflicts
      const colIndex = j * 4 + i;
      if (state[colIndex] !== 16 && (state[colIndex] - 1) % 4 === i) {
        if (state[colIndex] > maxInColumn) {
          maxInColumn = state[colIndex];
        } else {
          conflict += 2;
        }
      }
    }
  }
  return conflict;
};

const heuristic = (state: number[]): number => {
  return manhattanDistance(state) + linearConflict(state);
};

export const solvePuzzle = (initialState: number[]): PuzzleTile[] => {
  const pq = createPriorityQueue();
  const startNode: Node = {
    state: initialState,
    moves: [],
    cost: 0,
    priority: heuristic(initialState)
  };
  pq.enqueue(startNode);

  const visited = new Set<string>();
  visited.add(startNode.state.toString());

  while (!pq.isEmpty()) {
    const currentNode = pq.dequeue();

    if (heuristic(currentNode.state) === 0) {
      return currentNode.moves;
    }

    const emptyIndex = currentNode.state.indexOf(16);
    const possibleMoves = [
      { index: emptyIndex - 1, delta: 1 },   // Left
      { index: emptyIndex + 1, delta: -1 },  // Right
      { index: emptyIndex - 4, delta: 4 },   // Up
      { index: emptyIndex + 4, delta: -4 }   // Down
    ];

    for (const move of possibleMoves) {
      if (move.index >= 0 && move.index < 16) {
        const newState = [...currentNode.state];
        [newState[emptyIndex], newState[move.index]] = [newState[move.index], newState[emptyIndex]];

        if (!visited.has(newState.toString())) {
          visited.add(newState.toString());
          const newMoves = [...currentNode.moves, { value: newState[move.index], index: emptyIndex }];
          pq.enqueue({
            state: newState,
            moves: newMoves,
            cost: currentNode.cost + 1,
            priority: currentNode.cost + 1 + heuristic(newState)
          });
        }
      }
    }
  }

  return [];
};
