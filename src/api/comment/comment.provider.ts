import { Connection } from 'mongoose';
import { CommentSchema } from './schemas/comment.schema';

export const commentProviders = [
  {
    provide: 'COMMENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('COMMENT', CommentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
