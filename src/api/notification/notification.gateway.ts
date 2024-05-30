import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAuthMiddleware } from '../auth/guard/ws.middleware';
import { Notification } from './enums/notification';
import { WsJwtGuard } from '../auth/guard';

@WebSocketGateway({
  namespace: '/notification',
  cors: {
    origin: ['http://localhost:3333'],
  },
})
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server!: Server;
  user!: string;

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware() as any);
  }

  handleConnection(client: any) {
    this.user = WsJwtGuard.validateToken(client).name;
  }

  emit(user: string, notification: Notification) {
    if (this.user != null && user !== this.user) return;
    this.server.emit(notification);
  }
}
