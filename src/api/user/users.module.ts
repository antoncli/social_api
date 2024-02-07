import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { DatabaseModule } from 'src/db/database.module';
import { userProviders } from './users.provider';
import { UserController } from './users.controller';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
