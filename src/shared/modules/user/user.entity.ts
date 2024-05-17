import { User } from '../../types/index.js';

export class UserEntity implements User {
  public email: string;
  public avatarPath: string;
  public name: string;
  public type: string;
  public password: string
}
