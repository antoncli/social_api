import { ReactionController } from './reaction.controller';
import { reactionProviders } from './reaction.provider';
import { ReactionService } from './reaction.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ReactionController],
  providers: [ReactionService, ...reactionProviders],
  exports: [ReactionService],
})
export class ReactionModule {}
