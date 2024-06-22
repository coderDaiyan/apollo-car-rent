/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
}

export type TUserRoles = 'user' | 'admin';

export interface UserModel extends Model<TUser> {
  checkPasswordMatch(password: string, hash: string): boolean;
  ifUserExists(email: string): TUser;
  ifUserExistsById(id: string): TUser;
}
