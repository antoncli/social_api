import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { JwtGuard } from '../auth/guard';
import { LikeDto } from './dto/like.dto';

@Controller('like')
export class ReactionController {
  constructor(private reactionService: ReactionService) {}

  @UseGuards(JwtGuard)
  @Post('increment')
  like(@Body() dto: LikeDto) {
    return this.reactionService.like(dto.owner);
  }

  @UseGuards(JwtGuard)
  @Post('decrement')
  unlike(@Body() dto: LikeDto) {
    return this.reactionService.unlike(dto.owner);
  }

  @UseGuards(JwtGuard)
  @Post('increment')
  dislike(@Body() dto: LikeDto) {
    return this.reactionService.dislike(dto.owner);
  }

  @UseGuards(JwtGuard)
  @Post('decrement')
  undislike(@Body() dto: LikeDto) {
    return this.reactionService.undislike(dto.owner);
  }

  @UseGuards(JwtGuard)
  @Get('count')
  count(@Query() dto: LikeDto) {
    return this.reactionService.count(dto.owner);
  }
}
