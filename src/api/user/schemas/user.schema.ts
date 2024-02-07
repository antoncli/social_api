import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name!'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide a email!'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'Please provide a password!'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
