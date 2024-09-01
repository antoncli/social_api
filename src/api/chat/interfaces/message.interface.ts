export interface Message {
  readonly id: string;
  readonly chatId: string;
  readonly user: string;
  readonly text: string;
  readonly createdAt: number;
  readonly updatedAt: number;
}
