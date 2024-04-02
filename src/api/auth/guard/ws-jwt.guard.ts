import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Socket } from 'socket.io';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../interfaces/token-payload.interface';

export class WsJwtGuard extends AuthGuard('wsjwt') implements CanActivate {
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') {
      return false;
    }

    const client: Socket = context.switchToWs().getClient();
    WsJwtGuard.validateToken(client);

    return true;
  }

  static validateToken(client: Socket) {
    let { token } = client.handshake.query;
    token = Array.isArray(token) || token == undefined ? '' : token;
    return new JwtService().verify<TokenPayload>(token, {
      secret: process.env.JWT_SECRET as string,
    });
  }
}
