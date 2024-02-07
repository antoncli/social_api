import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { UserService } from '../user/users.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable({})
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: AuthDto) {
    const user = await this.userService.findOne(dto.email);

    if (!user) throw new ForbiddenException('Credentials incorrect');

    if (!(await bcryptjs.compare(dto.password, user.password)))
      throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.name);
  }

  async signout() {
    const secret = this.config.get('JWT_SECRET');
    const payload: TokenPayload = { name: 'name' };
    const token = await this.jwt.signAsync(payload, { expiresIn: '0', secret });
    return { access_token: token };
  }

  async signToken(name: string): Promise<{ access_token: string }> {
    const secret = this.config.get('JWT_SECRET');
    const payload: TokenPayload = { name };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '10h',
      secret,
    });
    return { access_token: token };
  }
}
