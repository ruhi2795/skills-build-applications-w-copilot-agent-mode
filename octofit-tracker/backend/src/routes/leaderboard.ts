import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

router.get('/', async (_request, response, next) => {
  try { response.json(await Leaderboard.find().populate('user team').sort({ rank: 1 })); } catch (error) { next(error); }
});

export default router;
