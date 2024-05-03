export interface Comment extends Document {
  readonly owner: string;
  readonly comments: {
    _id: string;
    user: string;
    text: string;
    readonly createdAt: number;
    readonly updatedAt: number;
  }[];
}
