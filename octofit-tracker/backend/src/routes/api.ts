import { Router } from 'express';
import Activity from '../models/activity.js';
import LeaderboardEntry from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const apiRouter = Router();

apiRouter.get('/users/', async (_request, response) => {
  const users = await User.find().sort({ username: 1 }).lean();
  response.json(users);
});

apiRouter.get('/teams/', async (_request, response) => {
  const teams = await Team.find().sort({ name: 1 }).lean();
  response.json(teams);
});

apiRouter.get('/activities/', async (_request, response) => {
  const activities = await Activity.find().sort({ completedAt: -1 }).lean();
  response.json(activities);
});

apiRouter.get('/leaderboard/', async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean();
  response.json(leaderboard);
});

apiRouter.get('/workouts/', async (_request, response) => {
  const workouts = await Workout.find().sort({ title: 1 }).lean();
  response.json(workouts);
});

export default apiRouter;
