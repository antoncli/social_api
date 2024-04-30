import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Reaction } from './interfaces/reaction.interface';

@Injectable({})
export class ReactionService {
  constructor(
    @Inject('REACTION_MODEL')
    private reactionModel: Model<Reaction>,
  ) {}

  async like(owner: string, user: string) {
    await this.reactionModel.updateOne(
      { owner },
      { $setOnInsert: {} },
      { upsert: true },
    );

    const results = await this.reactionModel.aggregate([
      {
        $match: {
          owner,
          'likes.users': { $not: { $elemMatch: { $eq: user } } },
        },
      },
      { $limit: 1 },
      {
        $addFields: {
          disliked: {
            $setIsSubset: ['$dislikes.users', [user]],
          },
        },
      },
    ]);

    if (!results.length) return;

    const options = results.at(0).disliked
      ? {
          $inc: { 'likes.count': 1, 'dislikes.count': -1 },
          $push: { 'likes.users': user },
          $pull: { 'dislikes.users': user },
        }
      : {
          $inc: { 'likes.count': 1 },
          $push: { 'likes.users': user },
        };

    await this.reactionModel.updateOne({ owner }, options);
  }

  async unlike(owner: string, user: string) {
    await this.reactionModel.updateOne(
      { owner, 'likes.users': { $elemMatch: { $eq: user } } },
      { $inc: { 'likes.count': -1 }, $pull: { 'likes.users': user } },
    );
  }

  async dislike(owner: string, user: string) {
    await this.reactionModel.updateOne(
      { owner },
      { $setOnInsert: {} },
      { upsert: true },
    );

    const results = await this.reactionModel.aggregate([
      {
        $match: {
          owner,
          'dislikes.users': { $not: { $elemMatch: { $eq: user } } },
        },
      },
      { $limit: 1 },
      {
        $addFields: {
          liked: {
            $setIsSubset: ['$likes.users', [user]],
          },
        },
      },
    ]);

    if (!results.length) return;

    const options = results.at(0).liked
      ? {
          $inc: { 'dislikes.count': 1, 'likes.count': -1 },
          $push: { 'dislikes.users': user },
          $pull: { 'likes.users': user },
        }
      : {
          $inc: { 'dislikes.count': -1 },
          $push: { 'dislikes.users': user },
        };

    await this.reactionModel.updateOne({ owner }, options);
  }

  async undislike(owner: string, user: string) {
    await this.reactionModel.updateOne(
      { owner, 'dislikes.users': { $elemMatch: { $eq: user } } },
      { $inc: { 'dislikes.count': -1 }, $pull: { 'dislikes.users': user } },
    );
  }
}
