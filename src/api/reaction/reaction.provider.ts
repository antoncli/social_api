import { Connection } from 'mongoose';
import { ReactionSchema } from './schemas/reaction.schema';

export const reactionProviders = [
  {
    provide: 'REACTION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('REACTION', ReactionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
