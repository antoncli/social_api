import { Socket } from 'socket.io';
import { WsJwtGuard } from './ws-jwt.guard';

type SocketIOMiddleware = (client: Socket, next: (err?: Error) => void) => void;

export const SocketAuthMiddleware = (): SocketIOMiddleware => {
  return (client: Socket, next: (err?: Error) => void) => {
    try {
      WsJwtGuard.validateToken(client);
      next();
    } catch (e) {
      if (e instanceof Error) {
        next(e);
        return;
      }
      next(new Error('Unexpected error!'));
    }
  };
};
