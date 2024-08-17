import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { commentProviders } from './comment.provider';
import { NotificationModule } from '../notification/notification.module';
import { CommentGateway } from './comment.gateway';

@Module({
  imports: [NotificationModule],
  controllers: [CommentController],
  providers: [CommentGateway, CommentService, ...commentProviders],
})
export class CommentModule {}
