import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/activity.js';
import LeaderboardEntry from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    const userData = [
      { username: 'alex.runner', email: 'alex.runner@example.com', firstName: 'Alex', lastName: 'Rivera', points: 420 },
      { username: 'sam.cycles', email: 'sam.cycles@example.com', firstName: 'Sam', lastName: 'Patel', points: 365 },
      { username: 'jordan.moves', email: 'jordan.moves@example.com', firstName: 'Jordan', lastName: 'Kim', points: 310 },
      { username: 'taylor.trains', email: 'taylor.trains@example.com', firstName: 'Taylor', lastName: 'Morgan', points: 275 },
    ];

    const users = await Promise.all(
      userData.map(({ username, ...fields }) =>
        User.findOneAndUpdate(
          { username },
          { $set: { ...fields, username } },
          { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true },
        ),
      ),
    );
    const usersByUsername = new Map(users.map((user) => [user.username, user]));

    const teamData = [
      {
        name: 'Trail Blazers',
        description: 'A team focused on running, hiking, and getting outdoors.',
        usernames: ['alex.runner', 'jordan.moves'],
      },
      {
        name: 'Pace Makers',
        description: 'A team building consistency through cycling and strength training.',
        usernames: ['sam.cycles', 'taylor.trains'],
      },
    ];

    for (const { name, description, usernames } of teamData) {
      const members = usernames.map((username) => {
        const user = usersByUsername.get(username);
        if (!user) {
          throw new Error(`Seed user not found: ${username}`);
        }
        return user._id;
      });
      const team = await Team.findOneAndUpdate(
        { name },
        { $set: { description, members } },
        { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true },
      );
      await User.updateMany({ _id: { $in: members } }, { $set: { team: team._id } });
    }

    const activityData = [
      { username: 'alex.runner', type: 'Outdoor run', durationMinutes: 42, caloriesBurned: 390, daysAgo: 1 },
      { username: 'sam.cycles', type: 'Cycling', durationMinutes: 55, caloriesBurned: 470, daysAgo: 1 },
      { username: 'jordan.moves', type: 'Strength training', durationMinutes: 35, caloriesBurned: 260, daysAgo: 2 },
      { username: 'taylor.trains', type: 'Yoga', durationMinutes: 30, caloriesBurned: 140, daysAgo: 2 },
      { username: 'alex.runner', type: 'Trail run', durationMinutes: 60, caloriesBurned: 540, daysAgo: 3 },
      { username: 'sam.cycles', type: 'Indoor cycling', durationMinutes: 40, caloriesBurned: 330, daysAgo: 4 },
    ];

    await Promise.all(
      activityData.map(({ username, daysAgo, ...activity }) => {
        const user = usersByUsername.get(username);
        if (!user) {
          throw new Error(`Seed user not found: ${username}`);
        }
        const completedAt = new Date();
        completedAt.setUTCHours(0, 0, 0, 0);
        completedAt.setUTCDate(completedAt.getUTCDate() - daysAgo);
        return Activity.findOneAndUpdate(
          {
            user: user._id,
            type: activity.type,
            completedAt: {
              $gte: completedAt,
              $lt: new Date(completedAt.getTime() + 24 * 60 * 60 * 1000),
            },
          },
          { $set: { ...activity, user: user._id, completedAt } },
          { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true },
        );
      }),
    );

    const period = new Date().toISOString().slice(0, 7);
    await Promise.all(
      userData.map(async ({ username, points }, index) => {
        const user = usersByUsername.get(username);
        if (!user) {
          throw new Error(`Seed user not found: ${username}`);
        }
        await LeaderboardEntry.findOneAndUpdate(
          { user: user._id, period },
          { $set: { user: user._id, score: points, rank: index + 1, period } },
          { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true },
        );
      }),
    );

    const workoutData = [
      {
        title: 'Easy Start Run',
        description: 'A conversational-pace run to build aerobic endurance.',
        activityType: 'Running',
        difficulty: 'beginner' as const,
        durationMinutes: 25,
      },
      {
        title: 'Full-body Strength Circuit',
        description: 'A balanced circuit of bodyweight strength exercises.',
        activityType: 'Strength training',
        difficulty: 'intermediate' as const,
        durationMinutes: 35,
      },
      {
        title: 'Tempo Ride',
        description: 'A steady cycling session with short tempo intervals.',
        activityType: 'Cycling',
        difficulty: 'intermediate' as const,
        durationMinutes: 40,
      },
      {
        title: 'Recovery Flow',
        description: 'Gentle mobility and yoga poses for an active recovery day.',
        activityType: 'Yoga',
        difficulty: 'beginner' as const,
        durationMinutes: 20,
      },
    ];

    await Promise.all(
      workoutData.map(({ title, ...workout }) =>
        Workout.findOneAndUpdate(
          { title },
          { $set: { ...workout, title } },
          { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true },
        ),
      ),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch(() => {
  process.exitCode = 1;
});
