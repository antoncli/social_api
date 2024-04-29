import mongoose from 'mongoose';

export const ReactionSchema = new mongoose.Schema({
  owner: {
    type: String,
    require: [true, 'Please provide like owner!'],
    index: true,
  },
  likes: {
    type: Number,
    require: [true, 'Please provide likes count!'],
    default: 0,
  },
  dislikes: {
    type: Number,
    require: [true, 'Please provide dislikes count!'],
    default: 0,
  },
});
