import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { chatProviders } from './chat.provider';

@Module({
  providers: [ChatGateway, ...chatProviders],
})
export class ChatModule {}
