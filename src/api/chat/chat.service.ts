import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Chat } from './interfaces/chat.interface';
import { ChatGateway } from './chat.gateway';
import { PostDto } from './dto/post.dto';
import * as bcryptjs from 'bcryptjs';
import { Message } from './interfaces/message.interface';

@Injectable({})
export class ChatService {
  constructor(
    @Inject('CHAT_MODEL')
    private chatModel: Model<Chat>,
    @Inject(forwardRef(() => ChatGateway))
    private readonly webSocketGateway: ChatGateway,
  ) {}

  async saveMessage(dto: PostDto) {
    const users = [dto.owner, dto.to].sort();
    const id = await this.getChatId(users[0], users[1]);
    const result = await this.chatModel.findOneAndUpdate(
      { id },
      {
        $push: {
          messages: {
            user: users.findIndex((user) => user === dto.owner),
            text: dto.text,
          },
        },
      },
      { upsert: true, new: true },
    );

    const message: Message = {
      id: result.messages[0]._id.toString(),
      user: dto.owner,
      text: result.messages[0].text,
      createdAt: result.messages[0].createdAt,
      updatedAt: result.messages[0].updatedAt,
    };

    console.log('Hello!');
    this.webSocketGateway.post(dto.owner, message);
    this.webSocketGateway.post(dto.to, message);
  }

  private async getChatId(user1: string, user2: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(`${user1}${user1}`, salt);
  }
}
