import { model, Schema, Types } from 'mongoose';

export interface Activity {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  completedAt: Date;
}

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, default: 0, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default model<Activity>('Activity', activitySchema);
