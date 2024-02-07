import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class FriendshipDto {
  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  name: string;
}
