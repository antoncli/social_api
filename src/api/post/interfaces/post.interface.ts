import { Document } from 'mongoose';

export interface Post extends Document {
  readonly name: string;
  readonly text: string;
  readonly reactions: {
    readonly likes: number;
    readonly dislikes: number;
  };
  readonly createdAt: number;
  readonly updatedAt: number;
}
