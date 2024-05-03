import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteDto {
  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  owner: string;

  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  commentId: string;
}
