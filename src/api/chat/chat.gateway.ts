import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
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
import Sockets from './classes/sockets.manager';

@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: [process.env.WEBAPP_URL],
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;
  private sockets: Sockets;

  constructor(
    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService,
  ) {
    this.sockets = new Sockets();
  }

  afterInit(socket: Socket) {
    socket.use(SocketAuthMiddleware() as any);
  }

  handleConnection(socket: Socket) {
    const name = WsJwtGuard.validateToken(socket).name;
    if (name == null) socket.disconnect();
    this.sockets.set(name, socket);
  }

  handleDisconnect(client: Socket) {
    this.sockets.deleteBySocketId(client.id);
  }

  @UseFilters(new BadRequestTransformationFilter())
  @UsePipes(new ValidationPipe())
  @SubscribeMessage('post')
  handlePost(@ConnectedSocket() socket: Socket, @MessageBody() data: PostDto) {
    const ownerSocket = this.sockets.get(data.owner);
    if (ownerSocket == null || ownerSocket.id !== socket.id) return;
    this.chatService.saveMessage(data);
  }

  post(user: string, message: Message) {
    this._emitNewMessage(user, message);
  }

  edit(user: string, message: Message) {
    // if (this.user == null || user !== this.user) return;
  }

  delete(user: string, message: Message) {
    // if (this.user == null || user !== this.user) return;
  }

  private _emitNewMessage(user: string, message: Message) {
    const socket = this.sockets.get(user);
    if (socket) socket.emit(ChatEvent.newMessage, message);
  }

  private emit(user: string, event: ChatEvent) {
    // if (this.user == null || user !== this.user) return;
    // this.server.emit(notification);
  }
}
