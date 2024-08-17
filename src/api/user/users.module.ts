import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { userProviders } from './users.provider';
import { UserController } from './users.controller';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
