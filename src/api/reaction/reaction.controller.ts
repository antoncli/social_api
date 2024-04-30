import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { JwtGuard } from '../auth/guard';
import { ReactionDto } from './dto/reaction.dto';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { GetTokenPayload } from '../auth/decorator';

@Controller('reaction')
export class ReactionController {
  constructor(private reactionService: ReactionService) {}

  @UseGuards(JwtGuard)
  @Post('like')
  like(
    @GetTokenPayload() tokenPayload: TokenPayload,
    @Body() dto: ReactionDto,
  ) {
    return this.reactionService.like(dto.owner, tokenPayload.name);
  }

  @UseGuards(JwtGuard)
  @Post('unlike')
  unlike(
    @GetTokenPayload() tokenPayload: TokenPayload,
    @Body() dto: ReactionDto,
  ) {
    return this.reactionService.unlike(dto.owner, tokenPayload.name);
  }

  @UseGuards(JwtGuard)
  @Post('dislike')
  dislike(
    @GetTokenPayload() tokenPayload: TokenPayload,
    @Body() dto: ReactionDto,
  ) {
    return this.reactionService.dislike(dto.owner, tokenPayload.name);
  }

  @UseGuards(JwtGuard)
  @Post('undislike')
  undislike(
    @GetTokenPayload() tokenPayload: TokenPayload,
    @Body() dto: ReactionDto,
  ) {
    return this.reactionService.undislike(dto.owner, tokenPayload.name);
  }
}
