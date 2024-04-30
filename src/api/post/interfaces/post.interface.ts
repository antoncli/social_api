import { Document } from 'mongoose';

export interface Post extends Document {
  readonly name: string;
  readonly text: string;
  readonly createdAt: number;
  readonly updatedAt: number;
}
