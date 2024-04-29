export interface Like extends Document {
  readonly owner: string;
  readonly likes: number;
  readonly dislikes: number;
}
