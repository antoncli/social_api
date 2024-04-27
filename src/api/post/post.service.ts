import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface';
import { FriendshipService } from '../friendship/friendship.service';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../notification/enums/notification';

@Injectable({})
export class PostService {
  constructor(
    @Inject('POST_MODEL')
    private postModel: Model<Post>,
    private friendshipService: FriendshipService,
    private notificationService: NotificationService,
  ) {}

  async add(name: string, text: string) {
    const post = new this.postModel({ name, text });
    await post.save();
    this.emit(name, Notification.postAdded);
  }

  async get(name: string, page: number, limit: number) {
    page = page - 1 || 0;
    const posts = await this.postModel
      .find({ name })
      .sort({ updatedAt: 'desc' })
      .skip(2 * page)
      .limit(limit);

    return posts.map((post) => ({
      id: post.id,
      name: post.name,
      text: post.text,
      date: post.createdAt,
    }));
  }

  async getFriends(name: string, page: number, limit: number) {
    const friends = await this.friendshipService.friends(name);

    const friendNames = friends.map((friend) => {
      if (friend.name1 === name) return friend.name2;
      return friend.name1;
    });

    page = page - 1 || 0;
    const posts = await this.postModel
      .find({ name: { $in: friendNames } })
      .sort({ updatedAt: 'desc' })
      .skip(limit * page)
      .limit(limit);

    return posts.map((post) => ({
      id: post.id,
      name: post.name,
      text: post.text,
      date: post.updatedAt,
    }));
  }

  async delete(name: string, id: string) {
    const res = await this.postModel.deleteOne({ name, _id: id });
    if (!res.deletedCount) throw new BadRequestException('Invalid post data!');
    this.emit(name, Notification.postDeleted);
  }

  private emit(name: string, notification: Notification) {
    this.notificationService.emit(name, notification);
    this.notificationService.emitForFriends(name, notification);
  }
}
