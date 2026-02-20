import mongoose, { Schema, Document } from 'mongoose';

// User Model
export interface IUser extends Document {
  discordId: string;
  username: string;
  avatar?: string;
  accessToken?: string;
  refreshToken?: string;
  email?: string;
  role: 'user' | 'admin';
  guilds?: any[];
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  discordId: { type: String, required: true, unique: true, index: true },
  username: { type: String, required: true },
  avatar: { type: String },
  accessToken: { type: String, select: false },
  refreshToken: { type: String, select: false },
  email: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  guilds: { type: [Object], select: false },
  createdAt: { type: Date, default: Date.now },
});

// Server Model
export interface IServer extends Document {
  guildId: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  inviteLink: string;
  icon?: string;
  banner?: string;
  ownerId: mongoose.Types.ObjectId;
  memberCount: number;
  onlineCount: number;
  bumpAt: Date;
  bumpCount: number;
  lastBumped?: Date;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const ServerSchema: Schema = new Schema({
  guildId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 2000 },
  category: { type: String, required: true },
  tags: { type: [String], index: true },
  inviteLink: { type: String, required: true },
  icon: { type: String },
  banner: { type: String },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  memberCount: { type: Number, default: 0 },
  onlineCount: { type: Number, default: 0 },
  bumpAt: { type: Date, default: Date.now },
  bumpCount: { type: Number, default: 0 },
  lastBumped: { type: Date },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

ServerSchema.index({ name: 'text', description: 'text', tags: 'text' });
ServerSchema.index({ bumpAt: -1 });

// Bump Cooldown Model
export interface IBumpCooldown extends Document {
  guildId: string;
  userId: string;
  expiresAt: Date;
}

const BumpCooldownSchema: Schema<IBumpCooldown> = new Schema({
  guildId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 2 * 60 * 60 * 1000),
    expires: 0
  }
});

// Create or get models
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const Server = mongoose.models.Server || mongoose.model<IServer>('Server', ServerSchema);
export const BumpCooldown = mongoose.models.BumpCooldown || mongoose.model<IBumpCooldown>('BumpCooldown', BumpCooldownSchema);
