import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://borilloqir:btQT3iHlWP51jHE5@cluster0.sra4yqb.mongodb.net/',
      ),
  },
];
