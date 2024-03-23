import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guard';
import { SocketAuthMiddleware } from '../auth/guard/ws.middleware';

@WebSocketGateway({
  namespace: 'events',
  cors: {
    origin: ['http://localhost:3333'],
  },
})
@UseGuards(WsJwtGuard)
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server!: Server;

  constructor(private readonly config: ConfigService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware() as any);
    console.log('WebSocket Gateway initialized');
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any): string {
    return data;
  }
}
