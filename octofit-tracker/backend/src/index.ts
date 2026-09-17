import express, { type ErrorRequestHandler } from 'express';
import cors from 'cors';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

export const PORT = Number(process.env.PORT) || 8000;
export const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`
  : `http://localhost:${PORT}`;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health/', (_request, response) => {
  response.json({ status: 'ok', apiUrl: apiBaseUrl });
});

app.use('/api/users/', usersRouter);
app.use('/api/teams/', teamsRouter);
app.use('/api/activities/', activitiesRouter);
app.use('/api/leaderboard/', leaderboardRouter);
app.use('/api/workouts/', workoutsRouter);

app.use((_request, response) => {
  response.status(404).json({ error: 'Not found' });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});

export default app;
