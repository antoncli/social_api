import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { JwtGuard } from '../auth/guard';
import { FriendshipDto } from './dto/friendship.dto';
import { GetTokenPayload } from '../auth/decorator';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';

@Controller('friendship')
export class FriendshipController {
  constructor(private friendshipService: FriendshipService) {}

  @UseGuards(JwtGuard)
  @Post('add')
  add(
    @GetTokenPayload() tokenPayload: TokenPayload,
    @Body() dto: FriendshipDto,
  ) {
    return this.friendshipService.add(tokenPayload.name, dto.name);
  }

  @UseGuards(JwtGuard)
  @Get('get')
  get(
    @GetTokenPayload() tokenPayload: TokenPayload,
    @Query() dto: FriendshipDto,
  ) {
    return this.friendshipService.get(tokenPayload.name, dto.name);
  }

  @UseGuards(JwtGuard)
  @Post('accept')
  accept(
    @GetTokenPayload() tokenPayload: TokenPayload,
    @Body() dto: FriendshipDto,
  ) {
    return this.friendshipService.accept(tokenPayload.name, dto.name);
  }

  @UseGuards(JwtGuard)
  @Get('accepted')
  accepted(
    @GetTokenPayload() tokenPayload: TokenPayload,
    @Query() dto: FriendshipDto,
  ) {
    return this.friendshipService.accepted(tokenPayload.name, dto.name);
  }

  @UseGuards(JwtGuard)
  @Post('delete')
  delete(
    @GetTokenPayload() tokenPayload: TokenPayload,
    @Body() dto: FriendshipDto,
  ) {
    return this.friendshipService.delete(tokenPayload.name, dto.name);
  }

  @UseGuards(JwtGuard)
  @Get('friend')
  friend(
    @GetTokenPayload() tokenPayload: TokenPayload,
    @Query() dto: FriendshipDto,
  ) {
    return this.friendshipService.friend(tokenPayload.name, dto.name);
  }
}
