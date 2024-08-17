export interface Message {
  readonly id: string;
  readonly owner: string;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly text: string;
}
