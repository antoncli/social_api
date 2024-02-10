import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetFriendsDto {
  @IsNumber()
  @IsNotEmpty()
  // @ts-ignore
  page: number;

  @IsNumber()
  @IsNotEmpty()
  // @ts-ignore
  limit: number;
}
