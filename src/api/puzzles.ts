import { Difficulty, puzzlesData } from '../data/puzzles.data';

import { Router } from 'express';
import { Sudoku } from '../lib/sudoku';

const router = Router();

interface PuzzleResponse {
  puzzle: string;
  difficulty: Difficulty;
}

router.get<{}, PuzzleResponse>('/', (req, res) => {
  const difficulty = ['easy', 'evil', 'hard'][
    Math.floor(Math.random() * 3)
  ] as Difficulty;

  const puzzle =
    puzzlesData[difficulty][
      Math.floor(Math.random() * puzzlesData[difficulty].length)
    ];

  res.json({ puzzle, difficulty });
});

router.get<{ difficulty: Difficulty }, PuzzleResponse>(
  '/:difficulty',
  (req, res) => {
    const { difficulty } = req.params;

    const puzzle =
      puzzlesData[difficulty][
        Math.floor(Math.random() * puzzlesData[difficulty].length)
      ];

    res.json({ puzzle, difficulty });
  },
);

router.post('/solve', (req, res, next) => {
  try {
    const { puzzle } = req.body;

    const sudoku = Sudoku.fromString(puzzle);

    const solution = sudoku.solve();

    if (!solution) {
      throw new Error('No solution found');
    }

    res.json({ puzzle, solution: sudoku.toString() });
  } catch (error) {
    if ((error as Error).message === 'Invalid sudoku string') {
      throw new Error('Invalid puzzle!');
    }

    next(error);
  }
});

export default router;
