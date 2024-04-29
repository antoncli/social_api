import { Connection } from 'mongoose';
import { ReactionSchema } from './schemas/reaction.schema';

export const reactionProviders = [
  {
    provide: 'LIKE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('LIKE', ReactionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
