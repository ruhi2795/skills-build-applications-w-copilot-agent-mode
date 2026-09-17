import { Router } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_request, response, next) => {
  try { response.json(await Team.find().sort({ name: 1 })); } catch (error) { next(error); }
});

router.post('/', async (request, response, next) => {
  try { response.status(201).json(await Team.create(request.body)); } catch (error) { next(error); }
});

export default router;
