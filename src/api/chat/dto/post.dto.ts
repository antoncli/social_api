import { IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  owner: string;

  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  to: string;

  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  text: string;
}
