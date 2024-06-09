import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAuthMiddleware } from '../auth/guard/ws.middleware';
import { WsJwtGuard } from '../auth/guard';
import { CommentEvent } from './enums/comment_event';

@WebSocketGateway({
  namespace: '/comment',
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

  handleConnection(client: any) {
    WsJwtGuard.validateToken(client);
    this.owner = client.handshake.query.owner;
  }

  emit(owner: string, event: CommentEvent, commentId: string) {
    if (this.owner != null && owner !== this.owner) return;
    this.server.emit(event, commentId);
  }
}
