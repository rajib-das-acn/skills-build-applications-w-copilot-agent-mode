import { model, Schema, Types } from 'mongoose';

export interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash?: string;
  team?: Types.ObjectId;
  points: number;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    passwordHash: { type: String, select: false },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export default model<User>('User', userSchema);
