import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(private readonly webSocketGateway: NotificationGateway) {}

  emitEvent(event: string, data: any) {
    // this.webSocketGateway.server.emit(event, data);
  }
}
