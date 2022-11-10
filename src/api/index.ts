import MessageResponse from '../interfaces/MessageResponse';
import express from 'express';
import puzzles from './puzzles';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/puzzles', puzzles);

export default router;
