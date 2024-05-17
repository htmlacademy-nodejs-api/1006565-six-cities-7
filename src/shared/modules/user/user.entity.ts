import { User } from '../../types/index.js';
import { prop, getModelForClass, defaultClasses, modelOptions} from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, unique: true, match: /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, message: 'Email is incorrect' })
  public email!: string;

  @prop({ minlength: 5, match: /^(https?:\/\/.*\.(?:png|jpg))$/, message: 'Avatar has incorrect format', required: false, default: '' })
  public avatarPath!: string;

  @prop({ required: true, minlength: 1, maxlength: 15, message: 'Min length for name is 1 and max length is 15', default: '' })
  public name!: string;

  @prop({ required: true, enum: ['pro', 'basic'], message: 'Type must be either pro or basic', default: '' })
  public type!: string;

  @prop({ required: true, minlength: 6, maxlength: 12, message: 'Min length for password is 6 and max length is 12' })
  public password!: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.name = userData.name;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
