import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser, UserModel } from './users.interface';

const userSchema = new Schema<TUser, UserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));

  next();
});

userSchema.post('save', function (data, next) {
  data.password = '';
  next();
});

userSchema.statics.checkPasswordMatch = async function checkPasswordMatch(
  password,
  hash,
) {
  return await bcrypt.compare(password, hash);
};

userSchema.statics.ifUserExists = async function ifUserExists(email: string) {
  const data = await User.findOne({ email });
  return data;
};

userSchema.statics.ifUserExistsById = async function ifUserExists(id: string) {
  const data = await User.findOne({ _id: id });
  return data;
};

const User = model<TUser, UserModel>('User', userSchema);
export default User;
