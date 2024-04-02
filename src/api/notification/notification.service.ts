import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { Notification } from './enums/notification';
import { FriendshipService } from '../friendship/friendship.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly webSocketGateway: NotificationGateway,
    private friendshipService: FriendshipService,
  ) {}

  emit(user: string, notification: Notification) {
    this.webSocketGateway.emit(user, notification);
  }

  async emitForFriends(user: string, notification: Notification) {
    const friends = await this.friendshipService.friends(user);
    friends.forEach((friend) => {
      if (friend.name1 === user)
        this.webSocketGateway.emit(friend.name2, notification);
      else this.webSocketGateway.emit(friend.name1, notification);
    });
  }
}
