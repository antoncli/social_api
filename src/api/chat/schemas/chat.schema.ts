import mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  users: {
    type: Array(String),
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
            require: [true, 'Please provide the user of the message!'],
          },
          text: {
            type: String,
            require: [true, 'Please provide the text of the message!'],
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
