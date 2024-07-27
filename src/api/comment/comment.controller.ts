import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtGuard } from '../auth/guard';
import { GetTokenPayload } from '../auth/decorator';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { AddDto } from './dto/add.dto';
import { DeleteDto } from './dto/delete.dto';
import { PageDto } from './dto/page.dto';
import { EditDto } from './dto/edit.dto';
import { GetDto } from './dto/get.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtGuard)
  @Post('add')
  add(@GetTokenPayload() tokenPayload: TokenPayload, @Body() dto: AddDto) {
    return this.commentService.add(dto.owner, tokenPayload.name, dto.text);
  }

  @UseGuards(JwtGuard)
  @Post('edit')
  edit(@GetTokenPayload() tokenPayload: TokenPayload, @Body() dto: EditDto) {
    return this.commentService.edit(
      dto.owner,
      tokenPayload.name,
      dto.commentId,
      dto.text,
    );
  }

  @UseGuards(JwtGuard)
  @Post('delete')
  delete(
    @GetTokenPayload() tokenPayload: TokenPayload,
    @Body() dto: DeleteDto,
  ) {
    return this.commentService.delete(
      dto.owner,
      tokenPayload.name,
      dto.commentId,
    );
  }

  @UseGuards(JwtGuard)
  @Get('get')
  get(@GetTokenPayload() tokenPayload: TokenPayload, @Query() dto: GetDto) {
    return this.commentService.get(tokenPayload.name, dto.owner, dto.commentId);
  }

  @UseGuards(JwtGuard)
  @Get('page')
  page(@GetTokenPayload() tokenPayload: TokenPayload, @Query() dto: PageDto) {
    return this.commentService.page(
      tokenPayload.name,
      dto.owner,
      dto.page,
      dto.limit,
    );
  }
}
