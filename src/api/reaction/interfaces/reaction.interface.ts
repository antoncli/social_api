export interface Reaction extends Document {
  readonly owner: string;
  readonly likes: { count: number; users: string[] };
  readonly dislikes: { count: number; users: string[] };
}
