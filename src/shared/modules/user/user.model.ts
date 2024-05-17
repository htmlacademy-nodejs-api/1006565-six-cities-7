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
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],

  },
  avatarPath: {
    type: String,
    minlength: [5, 'Min length for avatar path is 5'],
    match: [/^(https?:\/\/.*\.(?:png|jpg))$/, 'Avatar has incorrect format'],
  },
  name: {
    type: String,
    required: true,
    minlength: [1, 'Min length for name is 1'],
    maxlength: [15, 'Max length for name is 15'],
  },
  type: {
    type: String,
    required: true,
    enum: ['pro', 'basic']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Min length for password is 6'],
    maxlength: [12, 'Max length for password is 12'],
  },
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
