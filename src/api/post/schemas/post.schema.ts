import mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please provide post owner name!'],
      index: true,
    },
    text: { type: String, require: [true, 'Please provide post text!'] },
    reactions: {
      likes: { type: Number, default: 0 },
      dislikes: { type: Number, default: 0 },
    },
    createdAt: Number,
    updatedAt: Number,
  },
  {
    timestamps: true,
  },
);
