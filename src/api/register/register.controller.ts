import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.registerService.signup(dto);
  }
}
