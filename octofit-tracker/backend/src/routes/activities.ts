import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_request, response, next) => {
  try { response.json(await Activity.find().populate('user').sort({ completedAt: -1 })); } catch (error) { next(error); }
});

router.post('/', async (request, response, next) => {
  try { response.status(201).json(await Activity.create(request.body)); } catch (error) { next(error); }
});

export default router;
