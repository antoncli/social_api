import * as mongoose from 'mongoose';

export const FriendshipSchema = new mongoose.Schema({
  name1: { type: String, required: [true, 'Please provide a userName1!'] },
  name2: { type: String, required: [true, 'Please provide a userName2!'] },
  accepted: { type: Boolean, default: false },
});
