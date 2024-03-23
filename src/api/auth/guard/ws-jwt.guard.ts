import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Socket } from 'socket.io';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

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
    const { authorization } = client.handshake.headers;
    const token = authorization?.split(' ')[0];
    return new JwtService().verify(token || '', {
      secret: process.env.JWT_SECRET as string,
    });
  }
}
