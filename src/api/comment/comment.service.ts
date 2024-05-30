import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Comment } from './interfaces/comment.interface';
import { CommentGateway } from './comment.gateway';
import { CommentEvent } from './enums/CommentEvent';

@Injectable({})
export class CommentService {
  constructor(
    @Inject('COMMENT_MODEL')
    private commentModel: Model<Comment>,
    private readonly webSocketGateway: CommentGateway,
  ) {}

  async add(owner: string, user: string, text: string) {
    await this.commentModel.updateOne(
      { owner },
      { $push: { comments: { user, text } } },
      { upsert: true },
    );
    this.emit(owner, CommentEvent.commentAdded);
  }

  async delete(owner: string, user: string, commentId: string) {
    await this.commentModel.updateOne(
      {
        owner,
        comments: { $elemMatch: { _id: commentId, user } },
      },
      { $pull: { comments: { _id: commentId, user } } },
    );
    this.emit(owner, CommentEvent.commentDeleted);
  }

  async get(owner: string, page: number, limit: number) {
    return await this.commentModel.aggregate([
      {
        $match: { owner },
      },
      { $limit: 1 },
      { $unwind: '$comments' },
      { $sort: { 'comments.updatedAt': -1 } },
      { $skip: limit * (page - 1 || 0) },
      { $limit: limit },
      {
        $project: {
          id: '$comments._id',
          user: '$comments.user',
          owner,
          text: '$comments.text',
          createdAt: '$comments.createdAt',
          updatedAt: '$comments.updatedAt',
          _id: 0,
        },
      },
    ]);
  }

  async getIds(owner: string, page: number, limit: number) {
    const data = await this.commentModel.aggregate([
      {
        $match: { owner },
      },
      { $limit: 1 },
      { $unwind: '$comments' },
      { $sort: { 'comments.updatedAt': -1 } },
      { $skip: limit * (page - 1 || 0) },
      { $limit: limit },
      {
        $project: {
          id: '$comments._id',
          _id: 0,
        },
      },
      {
        $group: {
          _id: null,
          ids: { $push: '$id' },
        },
      },
      {
        $project: {
          _id: 0,
          ids: 1,
        },
      },
    ]);

    return data[0].ids!;
  }

  emit(user: string, notification: CommentEvent) {
    this.webSocketGateway.emit(user, notification);
  }
}
