import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { postProviders } from './post.provider';
import { FriendshipModule } from '../friendship/friendship.module';

@Module({
  imports: [DatabaseModule, FriendshipModule],
  controllers: [PostController],
  providers: [PostService, ...postProviders],
})
export class PostModule {}
