import { User } from '../../types/index.js';
import { prop, getModelForClass, defaultClasses} from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, unique: true, match: /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, message: 'Email is incorrect' })
  public email!: string;

  @prop({ minlength: 5, match: /^(https?:\/\/.*\.(?:png|jpg))$/, message: 'Avatar has incorrect format' })
  public avatarPath!: string;

  @prop({ required: true, minlength: 1, maxlength: 15, message: 'Min length for name is 1 and max length is 15' })
  public name!: string;

  @prop({ required: true, enum: ['pro', 'basic'], message: 'Type must be either pro or basic' })
  public type!: string;

  @prop({ required: true, minlength: 6, maxlength: 12, message: 'Min length for password is 6 and max length is 12' })
  public password!: string;
}

export const UserModel = getModelForClass(UserEntity);
