import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { postProviders } from './post.provider';
import { FriendshipModule } from '../friendship/friendship.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [DatabaseModule, FriendshipModule, NotificationModule],
  controllers: [PostController],
  providers: [PostService, ...postProviders],
})
export class PostModule {}
