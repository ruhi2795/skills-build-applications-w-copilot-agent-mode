import { Router } from 'express';

const router = Router();

router.get('/', (_request, response) => {
  response.json([]);
});

router.post('/', (request, response) => {
  response.status(201).json(request.body);
});

export default router;
