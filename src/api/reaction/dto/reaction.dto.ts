import { IsNotEmpty, IsString } from 'class-validator';

export class ReactionDto {
  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  owner: string;
}
