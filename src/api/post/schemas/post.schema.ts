import mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please provide post owner name!'],
      index: true,
    },
    text: { type: String, require: [true, 'Please provide post text!'] },
    createdAt: Number,
    updatedAt: Number,
  },
  {
    timestamps: true,
  },
);
