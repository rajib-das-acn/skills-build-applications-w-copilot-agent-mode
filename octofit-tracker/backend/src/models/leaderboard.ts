import { model, Schema, Types } from 'mongoose';

export interface LeaderboardEntry {
  user: Types.ObjectId;
  score: number;
  rank: number;
  period: string;
}

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export default model<LeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
