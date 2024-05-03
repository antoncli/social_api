import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { commentProviders } from './comment.provider';
import { NotificationModule } from '../notification/notification.module';
import { CommentGateway } from './comment.gateway';

@Module({
  imports: [DatabaseModule, NotificationModule],
  controllers: [CommentController],
  providers: [CommentGateway, CommentService, ...commentProviders],
})
export class CommentModule {}
