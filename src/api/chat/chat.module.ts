import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { chatProviders } from './chat.provider';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatGateway, ChatService, ...chatProviders],
})
export class ChatModule {}
