import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from '../user/users.service';

@Injectable({})
export class RegisterService {
  constructor(private userService: UserService) {}

  signup(dto: SignUpDto) {
    return this.userService.create({ ...dto });
  }
}
