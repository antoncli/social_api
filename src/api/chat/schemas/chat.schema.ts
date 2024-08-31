import mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  id: {
    type: String,
    require: [true, 'Please provide chat id!'],
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
            type: Number,
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
