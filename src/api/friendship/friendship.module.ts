import { Module } from '@nestjs/common';
import { friendshipProviders } from './friendship.provider';
import { DatabaseModule } from 'src/db/database.module';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FriendshipController],
  providers: [FriendshipService, ...friendshipProviders],
  exports: [FriendshipService],
})
export class FriendshipModule {}
