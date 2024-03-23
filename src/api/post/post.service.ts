import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface';
import { FriendshipService } from '../friendship/friendship.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({})
export class PostService {
  constructor(
    @Inject('POST_MODEL')
    private postModel: Model<Post>,
    private friendshipService: FriendshipService,
    private notificationService: NotificationService,
  ) {
    this.test();
  }

  async add(name: string, text: string) {
    const post = new this.postModel({ name, text });
    await post.save();
  }

  async get(name: string, page: number, limit: number) {
    page = page - 1 || 0;
    const posts = await this.postModel
      .find({ name })
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
    const friendIds = friends.map((friend) => friend.id);

    page = page - 1 || 0;
    const posts = await this.postModel
      .find({ _id: { $in: friendIds } })
      .skip(2 * page)
      .limit(limit);

    return posts.map((post) => ({
      id: post.id,
      name: post.name,
      text: post.text,
      date: post.createdAt,
    }));
  }

  async delete(name: string, id: string) {
    const res = await this.postModel.deleteOne({ name, _id: id });
    if (!res.deletedCount) throw new BadRequestException('Invalid post data!');
  }

  async test() {
    setInterval(() => {
      this.notificationService.emitEvent('test', { msg: 'hello' });
    }, 2000);
  }
}
