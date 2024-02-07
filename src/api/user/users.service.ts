import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { SignUpDto } from '../register/dto/sign-up.dto';
import * as bcryptjs from 'bcryptjs';
import { FindDto } from './dto/find.dto';

@Injectable({})
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(dto: SignUpDto) {
    const user = await this.userModel.findOne({ email: dto.email });

    if (user) {
      throw new BadRequestException('User already exists!');
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(dto.password, salt);

    const createdUser = new this.userModel({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    await createdUser.save();
    return { success: true, messsage: 'User created!' };
  }

  async find(dto: FindDto) {
    const page = dto.page - 1 || 0;
    const users = await this.userModel
      .find({ name: new RegExp('\\b' + dto.input + '\\w*', 'gi') })
      .skip(2 * page)
      .limit(dto.limit);

    return users.map((user) => ({ name: user.name }));
  }

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
}
