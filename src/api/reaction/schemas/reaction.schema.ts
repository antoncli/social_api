import mongoose from 'mongoose';

export const ReactionSchema = new mongoose.Schema({
  owner: {
    type: String,
    require: [true, 'Please provide like owner!'],
    index: true,
    unique: true,
  },
  likes: {
    count: {
      type: Number,
      require: [true, 'Please provide likes count!'],
      default: 0,
    },
    users: {
      type: [String],
      require: [true, 'Please add the user who liked!'],
      default: [],
    },
  },
  dislikes: {
    count: {
      type: Number,
      require: [true, 'Please provide dislikes count!'],
      default: 0,
    },
    users: {
      type: [String],
      require: [true, 'Please add the user who liked!'],
      default: [],
    },
  },
});
