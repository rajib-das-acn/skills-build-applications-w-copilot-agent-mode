import { model, Schema } from 'mongoose';

export interface Workout {
  title: string;
  description: string;
  activityType: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
}

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    activityType: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export default model<Workout>('Workout', workoutSchema);
