import { Connection } from 'mongoose';
import { FriendshipSchema } from './schemas/friendship.schema';

export const friendshipProviders = [
  {
    provide: 'FRIENDSHIP_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('FRIENDSHIP', FriendshipSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
