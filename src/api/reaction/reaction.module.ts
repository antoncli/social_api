import { DatabaseModule } from 'src/db/database.module';
import { ReactionController } from './reaction.controller';
import { reactionProviders } from './reaction.provider';
import { ReactionService } from './reaction.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [ReactionController],
  providers: [ReactionService, ...reactionProviders],
  exports: [ReactionService],
})
export class ReactionModule {}
