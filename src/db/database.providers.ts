import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: (config: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(config.get('MONGO_URI') as string),
  },
];
