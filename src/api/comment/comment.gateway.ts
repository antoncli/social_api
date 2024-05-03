import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAuthMiddleware } from '../auth/guard/ws.middleware';
import { WsJwtGuard } from '../auth/guard';
import { CommentEvent } from './enums/CommentEvent';

@WebSocketGateway({
  namespace: 'comment',
  cors: {
    origin: ['http://localhost:3333'],
  },
})
export class CommentGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server!: Server;
  owner!: string;

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware() as any);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('CommentGateway');
    console.log(client.handshake.query);
    WsJwtGuard.validateToken(client);
    // this.owner = WsJwtGuard.validateToken(client).name;
  }

  emit(user: string, event: CommentEvent) {
    if (user !== this.owner) return;
    this.server.emit(event);
  }
}
