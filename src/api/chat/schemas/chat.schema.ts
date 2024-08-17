import mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  user1: {
    type: String,
    require: [true, 'Please provide comment owner!'],
    index: true,
  },
  user2: {
    type: String,
    require: [true, 'Please provide comment owner!'],
    index: true,
  },
  messages: {
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
