import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Friendship } from './interfaces/friendship.interface';

@Injectable({})
export class FriendshipService {
  constructor(
    @Inject('FRIENDSHIP_MODEL')
    private friendshipModel: Model<Friendship>,
  ) {}

  async add(name1: string, name2: string) {
    const res = await this.findFriendship(name1, name2);

    if (res != null)
      throw new BadRequestException('Friendship already exists!');

    const friendship = new this.friendshipModel({
      name1,
      name2,
    });
    await friendship.save();
  }

  async get(name1: string, name2: string) {
    const res = await this.findFriendship(name1, name2);

    if (res == null) throw new BadRequestException('friendship do not exist');

    return { name1: res.name1, name2: res.name2, accepted: res.accepted };
  }

  async accept(name1: string, name2: string) {
    const res = await this.friendshipModel.findOneAndUpdate(
      {
        name1: name2,
        name2: name1,
      },
      { accepted: true },
    );

    if (res == null)
      throw new BadRequestException(
        'friendship do not exist or you offered friendship',
      );
  }

  async accepted(name1: string, name2: string) {
    const res = await this.findFriendship(name1, name2);
    if (res == null) throw new BadRequestException('Friendship do not exists!');
    return { accepted: res.accepted };
  }

  async delete(name1: string, name2: string) {
    const res =
      (await this.friendshipModel.findOneAndDelete({ name1, name2 })) ||
      (await this.friendshipModel.findOneAndDelete({ name2, name1 }));
    if (res == null) throw new BadRequestException('Friendship do not exists!');
  }

  async friend(name1: string, name2: string) {
    const res = await this.findFriendship(name1, name2);
    return { friend: res != null };
  }

  async friends(name: string) {
    return [
      ...((await this.friendshipModel.find({ name1: name })) || []),
      ...((await this.friendshipModel.find({ name2: name })) || []),
    ];
  }

  private async findFriendship(name1: string, name2: string) {
    return (
      (await this.friendshipModel.findOne({ name1, name2 })) ||
      (await this.friendshipModel.findOne({ name1: name2, name2: name1 }))
    );
  }
}
