import mongoose from 'mongoose';

export interface Chat {
  readonly users: string[];
  messages: {
    readonly _id: mongoose.Types.ObjectId;
    readonly user: string;
    text: string;
    readonly createdAt: number;
    readonly updatedAt: number;
  }[];
}
