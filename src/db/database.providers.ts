import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://borilloqir:h7dgHuj24KoyiUAW@cluster0.sra4yqb.mongodb.net/',
      ),
  },
];
