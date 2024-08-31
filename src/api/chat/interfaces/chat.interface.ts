import mongoose from 'mongoose';

export interface Chat {
  readonly id: string;
  messages: {
    readonly _id: mongoose.Types.ObjectId;
    readonly user: number;
    text: string;
    readonly createdAt: number;
    readonly updatedAt: number;
  }[];
}
