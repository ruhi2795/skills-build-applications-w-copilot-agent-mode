import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_request, response, next) => {
  try { response.json(await Workout.find().sort({ difficulty: 1, title: 1 })); } catch (error) { next(error); }
});

router.post('/', async (request, response, next) => {
  try { response.status(201).json(await Workout.create(request.body)); } catch (error) { next(error); }
});

export default router;
