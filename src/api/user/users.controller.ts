import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { FindDto } from './dto/find.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('find')
  find(@Query() dto: FindDto) {
    return this.userService.find(dto);
  }
}
