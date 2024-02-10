import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteDto {
  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  id: string;
}
