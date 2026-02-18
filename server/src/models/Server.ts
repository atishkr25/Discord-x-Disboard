import mongoose, { Schema, Document } from 'mongoose';

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
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

ServerSchema.index({ name: 'text', description: 'text', tags: 'text' });
ServerSchema.index({ bumpAt: -1 }); // Index for sorting by bump

export default mongoose.model<IServer>('Server', ServerSchema);
