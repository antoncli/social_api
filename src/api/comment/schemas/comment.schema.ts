import mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  owner: {
    type: String,
    require: [true, 'Please provide comment owner!'],
    index: true,
    unique: true,
  },
  comments: {
    type: [
      new mongoose.Schema(
        {
          id: {
            type: String,
            default: mongoose.Types.ObjectId,
          },
          user: {
            type: String,
            require: [true, 'Please provide comment user!'],
          },
          text: {
            type: String,
            require: [true, 'Please provide comment text!'],
          },
          createdAt: Number,
          updatedAt: Number,
        },
        {
          timestamps: true,
        },
      ),
    ],
    default: [],
  },
});
