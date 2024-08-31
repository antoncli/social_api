import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAuthMiddleware } from '../auth/guard/ws.middleware';
import { WsJwtGuard } from '../auth/guard';
import { Message } from './interfaces/message.interface';
import {
  forwardRef,
  Inject,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BadRequestTransformationFilter } from 'src/share/filters/bad_request_transformation.filter';
import { PostDto } from './dto/post.dto';
import { ChatEvent } from './enums/chat_event';
import { ChatService } from './chat.service';

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

  constructor(
    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService,
  ) {}

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware() as any);
  }

  handleConnection(client: any) {
    console.log(client);
    client.send('Hello');
    this.user = WsJwtGuard.validateToken(client).name;
  }

  @UseFilters(new BadRequestTransformationFilter())
  @UsePipes(new ValidationPipe())
  @SubscribeMessage('post')
  handlePost(@MessageBody() data: PostDto) {
    if (this.user == null || data.owner != this.user) return;
    this.chatService.saveMessage(data);
  }

  post(user: string, message: Message) {
    console.log(this.user);
    if (this.user == null || user !== this.user) return;
    this._emitNewMessage(user, message);
  }

  edit(user: string, message: Message) {
    if (this.user == null || user !== this.user) return;
  }

  delete(user: string, message: Message) {
    if (this.user == null || user !== this.user) return;
  }

  private _emitNewMessage(user: string, message: Message) {
    if (this.user == null || user !== this.user) return;
    console.log(ChatEvent.newMessage, message);
    this.server.emit(ChatEvent.newMessage, message);
  }

  private emit(user: string, event: ChatEvent) {
    if (this.user == null || user !== this.user) return;
    // this.server.emit(notification);
  }
}
