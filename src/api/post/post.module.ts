import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { postProviders } from './post.provider';
import { FriendshipModule } from '../friendship/friendship.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [FriendshipModule, NotificationModule],
  controllers: [PostController],
  providers: [PostService, ...postProviders],
})
export class PostModule {}
