import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import mongoose, { Model, PipelineStage } from 'mongoose';
import { Comment } from './interfaces/comment.interface';
import { CommentGateway } from './comment.gateway';
import { CommentEvent } from './enums/comment_event';
import { reactionsAggregation } from 'src/db/helpers/reactions_aggregation.helper';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class CommentService {
  constructor(
    @Inject('COMMENT_MODEL')
    private commentModel: Model<Comment>,
    private readonly webSocketGateway: CommentGateway,
    private config: ConfigService,
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

  async edit(owner: string, user: string, commentId: string, text: string) {
    const oneHourAgo = new Date(
      Date.now() -
        parseInt(this.config.get('COMMENT_EDIT_TIMEOUT') as string) * 60 * 1000,
    );

    const result = await this.commentModel.findOneAndUpdate(
      {
        owner,
        comments: {
          $elemMatch: { _id: commentId, user, createdAt: { $gte: oneHourAgo } },
        },
      },
      {
        $set: {
          'comments.$.text': text,
        },
      },
      {
        new: true,
      },
    );

    if (result) this.emit(owner, CommentEvent.commentEdited, commentId);
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

  async get(user: string, owner: string, commentId: string) {
    const result = await this.commentModel.aggregate([
      { $match: { owner } },
      { $unwind: '$comments' },
      {
        $match: {
          'comments._id': new mongoose.Types.ObjectId(commentId),
          'comments.user': user,
        },
      },
      { $addFields: { id: { $toString: '$comments._id' } } },
      ...reactionsAggregation(user, '_id', owner),
      ...this._projectComment(),
    ]);

    if (!result.length) throw new BadRequestException('Comment not found!');
    return result[0];
  }

  async page(user: string, owner: string, page: number, limit: number) {
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
      ...this._projectComment(),
    ]);
  }

  emit(user: string, notification: CommentEvent, commentId: string) {
    this.webSocketGateway.emit(user, notification, commentId);
  }

  private _projectComment(): PipelineStage[] {
    return [
      {
        $project: {
          id: '$id',
          user: '$comments.user',
          owner: '$owner',
          text: '$comments.text',
          createdAt: '$comments.createdAt',
          updatedAt: '$comments.updatedAt',
          likeCount: '$likeCount',
          liked: '$liked',
          users: '$users',
          _id: 0,
        },
      },
    ];
  }
}
