import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAuthMiddleware } from '../auth/guard/ws.middleware';
import { WsJwtGuard } from '../auth/guard';
import { Message } from './interfaces/message.interface';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { BadRequestTransformationFilter } from 'src/share/filters/bad_request_transformation.filter';
import { PostDto } from './dto/post.dto';

@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: [process.env.WEBAPP_URL],
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server!: Server;
  user!: string;

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware() as any);
  }

  handleConnection(client: any) {
    this.user = WsJwtGuard.validateToken(client).name;
  }

  @UseFilters(new BadRequestTransformationFilter())
  @UsePipes(new ValidationPipe())
  @SubscribeMessage('post')
  handlePost(@MessageBody() data: PostDto) {
    if (this.user == null || data.owner != this.user) return;
    console.log(data);
  }

  post(user: string, message: Message) {
    if (this.user == null || user !== this.user) return;
  }

  edit(user: string, message: Message) {
    if (this.user == null || user !== this.user) return;
  }

  delete(user: string, message: Message) {
    if (this.user == null || user !== this.user) return;
  }

  emit(user: string, notification: Notification) {
    if (this.user == null || user !== this.user) return;
    // this.server.emit(notification);
  }
}
