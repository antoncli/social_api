import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtGuard } from '../auth/guard';
import { GetTokenPayload } from '../auth/decorator';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { AddDto } from './dto/add.dto';
import { GetDto } from './dto/get.dto';
import { DeleteDto } from './dto/delete.dto';
import { GetFriendsDto } from './dto/get_friends.dto';
import { Observable, interval, map } from 'rxjs';

interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtGuard)
  @Post('add')
  add(@GetTokenPayload() tokenPayload: TokenPayload, @Body() dto: AddDto) {
    return this.postService.add(tokenPayload.name, dto.text);
  }

  @UseGuards(JwtGuard)
  @Get('get')
  get(@Query() dto: GetDto) {
    return this.postService.get(dto.name, dto.page, dto.limit);
  }

  @UseGuards(JwtGuard)
  @Get('get_friends')
  getFriends(
    @GetTokenPayload() tokenPayload: TokenPayload,
    @Query() dto: GetFriendsDto,
  ) {
    return this.postService.getFriends(tokenPayload.name, dto.page, dto.limit);
  }

  @UseGuards(JwtGuard)
  @Post('delete')
  delete(
    @GetTokenPayload() tokenPayload: TokenPayload,
    @Body() dto: DeleteDto,
  ) {
    return this.postService.delete(tokenPayload.name, dto.id);
  }
}
