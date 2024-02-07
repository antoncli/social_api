import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { UserModule } from '../user/users.module';

@Module({
  imports: [UserModule],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
