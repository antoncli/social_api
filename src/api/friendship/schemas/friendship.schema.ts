import * as mongoose from 'mongoose';

export const FriendshipSchema = new mongoose.Schema({
  name1: {
    type: String,
    required: [true, 'Please provide a userName1!'],
    index: true,
  },
  name2: {
    type: String,
    required: [true, 'Please provide a userName2!'],
    index: true,
  },
  accepted: { type: Boolean, default: false },
});
