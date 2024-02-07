import { Document } from 'mongoose';

export interface Friendship extends Document {
  readonly name1: string;
  readonly name2: string;
  readonly accepted: boolean;
}
