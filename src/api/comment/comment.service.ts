import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Comment } from './interfaces/comment.interface';
import { CommentGateway } from './comment.gateway';
import { CommentEvent } from './enums/comment_event';
import { reactionsAggregation } from 'src/db/helpers/reactions_aggregation.helper';

@Injectable({})
export class CommentService {
  constructor(
    @Inject('COMMENT_MODEL')
    private commentModel: Model<Comment>,
    private readonly webSocketGateway: CommentGateway,
  ) {}

  async add(owner: string, user: string, text: string) {
    const data = await this.commentModel.findOneAndUpdate(
      { owner },
      { $push: { comments: { user, text } } },
      { upsert: true },
    );
    if (!data) return;
    this.emit(owner, CommentEvent.commentAdded, data.comments.at(-1)!._id);
  }

  async delete(owner: string, user: string, commentId: string) {
    await this.commentModel.updateOne(
      {
        owner,
        comments: { $elemMatch: { _id: commentId, user } },
      },
      { $pull: { comments: { _id: commentId, user } } },
    );
    this.emit(owner, CommentEvent.commentDeleted, commentId);
  }

  async get(user: string, owner: string, page: number, limit: number) {
    return await this.commentModel.aggregate([
      {
        $match: { owner },
      },
      { $limit: 1 },
      { $unwind: '$comments' },
      { $sort: { 'comments.updatedAt': -1 } },
      { $skip: limit * (page - 1 || 0) },
      { $limit: limit },
      { $addFields: { id: { $toString: '$comments._id' } } },
      ...reactionsAggregation(user, 'id', 'owner'),
      {
        $project: {
          id: '$id',
          user: '$comments.user',
          owner,
          text: '$comments.text',
          createdAt: '$comments.createdAt',
          updatedAt: '$comments.updatedAt',
          likeCount: '$likeCount',
          liked: '$liked',
          users: '$users',
          _id: 0,
        },
      },
    ]);
  }

  emit(user: string, notification: CommentEvent, commentId: string) {
    this.webSocketGateway.emit(user, notification, commentId);
  }
}
