import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface';
import { FriendshipService } from '../friendship/friendship.service';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../notification/enums/notification';
import { reactionsAggregation } from 'src/db/helpers/reactions_aggregation.helper';

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
    const posts = await this.getPosts([name], name, page - 1 || 0, limit);

    return posts.map((post) => ({
      id: post._id,
      name: post.name,
      text: post.text,
      date: post.createdAt,
      likeCount: post.likeCount,
      liked: post.users.length ? post.liked : false,
      users: post.users,
    }));
  }

  async getFriends(name: string, page: number, limit: number) {
    const friends = await this.friendshipService.friends(name);

    const friendNames = friends.map((friend) => {
      if (friend.name1 === name) return friend.name2;
      return friend.name1;
    });

    const posts = await this.getPosts(friendNames, name, page - 1 || 0, limit);

    return posts.map((post) => ({
      id: post._id,
      name: post.name,
      text: post.text,
      date: post.createdAt,
      likeCount: post.likeCount,
      liked: post.users.length ? post.liked : false,
      users: post.users,
    }));
  }

  async delete(name: string, id: string) {
    const res = await this.postModel.deleteOne({ name, _id: id });
    if (!res.deletedCount) throw new BadRequestException('Invalid post data!');
    this.emit(name, Notification.postDeleted);
  }

  private async getPosts(
    names: string[],
    likedBy: string,
    page: number,
    limit: number,
  ) {
    return await this.postModel.aggregate([
      { $match: { name: { $in: names } } },
      { $sort: { updatedAt: -1 } },
      { $skip: limit * page },
      { $limit: limit },
      { $addFields: { userId: { $toString: '$_id' } } },
      ...reactionsAggregation(likedBy, 'userId', 'owner'),
    ]);
  }

  private emit(name: string, notification: Notification) {
    this.notificationService.emit(name, notification);
    this.notificationService.emitForFriends(name, notification);
  }
}
