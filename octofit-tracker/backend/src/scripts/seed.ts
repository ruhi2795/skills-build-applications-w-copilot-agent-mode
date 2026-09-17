import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

/** Seed the octofit_db database with test data. */
async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();
    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [teamRed, teamBlue] = await Team.create([
      { name: 'Rocket Runners', description: 'A team focused on endurance and consistency.', color: '#e55353' },
      { name: 'Galaxy Movers', description: 'A team that makes every workout count.', color: '#3b82f6' },
    ]);

    const users = await User.create([
      { username: 'alex.runner', email: 'alex@example.com', firstName: 'Alex', lastName: 'Rivera', team: teamRed._id },
      { username: 'sam.strong', email: 'sam@example.com', firstName: 'Sam', lastName: 'Taylor', team: teamBlue._id },
      { username: 'jamie.active', email: 'jamie@example.com', firstName: 'Jamie', lastName: 'Chen', team: teamRed._id },
    ]);

    const period = new Date().toISOString().slice(0, 7);
    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 35, points: 70, completedAt: new Date() },
      { user: users[1]._id, type: 'strength', durationMinutes: 45, points: 90, completedAt: new Date() },
      { user: users[2]._id, type: 'walking', durationMinutes: 30, points: 45, completedAt: new Date() },
    ]);

    await Leaderboard.create([
      { user: users[1]._id, team: teamBlue._id, points: 90, rank: 1, period },
      { user: users[0]._id, team: teamRed._id, points: 70, rank: 2, period },
      { user: users[2]._id, team: teamRed._id, points: 45, rank: 3, period },
    ]);

    await Workout.create([
      { title: 'Track Intervals', description: 'Alternate fast and easy running intervals.', activityType: 'running', difficulty: 'intermediate', durationMinutes: 30, target: 'Build speed and endurance' },
      { title: 'Full Body Basics', description: 'A balanced strength routine using bodyweight movements.', activityType: 'strength', difficulty: 'beginner', durationMinutes: 25, target: 'Build foundational strength' },
      { title: 'Mindful Walk', description: 'A steady outdoor walk with simple mobility breaks.', activityType: 'walking', difficulty: 'beginner', durationMinutes: 30, target: 'Improve daily activity' },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts in octofit_db.');
    console.log(`Counts: ${await User.countDocuments()} users, ${await Team.countDocuments()} teams, ${await Activity.countDocuments()} activities, ${await Leaderboard.countDocuments()} leaderboard entries, ${await Workout.countDocuments()} workouts.`);
  } finally {
    await disconnectDatabase();
    await mongoose.disconnect().catch(() => undefined);
  }
}

seedDatabase().catch((error) => {
  console.error('Error seeding octofit_db:', error);
  process.exitCode = 1;
});
