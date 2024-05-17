import { Schema, Document, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  avatarPath: String,
  name: {
    type: String,
    minlength: 1,
    maxlength: 15
  },
  type: String,
  password: String
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
