import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Like } from './interfaces/reaction.interface';

@Injectable({})
export class ReactionService {
  constructor(
    @Inject('LIKE_MODEL')
    private likeModel: Model<Like>,
  ) {}

  async like(owner: string) {
    await this.likeModel.findOneAndUpdate(
      { owner },
      { $inc: { like: 1 } },
      { upsert: true },
    );
  }

  async unlike(owner: string) {
    await this.likeModel.findOneAndUpdate(
      { owner },
      { $inc: { like: -1 } },
      { upsert: true },
    );
  }

  async dislike(owner: string) {
    await this.likeModel.findOneAndUpdate(
      { owner },
      { $inc: { dislikes: 1 } },
      { upsert: true },
    );
  }

  async undislike(owner: string) {
    await this.likeModel.findOneAndUpdate(
      { owner },
      { $inc: { dislikes: -1 } },
      { upsert: true },
    );
  }

  async count(owner: string) {
    return (await this.likeModel.findOne({ owner }))?.likes || 0;
  }
}
