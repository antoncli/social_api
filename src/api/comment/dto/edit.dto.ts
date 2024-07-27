import { IsNotEmpty, IsString } from 'class-validator';

export class EditDto {
  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  owner: string;

  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  commentId: string;

  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  text: string;
}
