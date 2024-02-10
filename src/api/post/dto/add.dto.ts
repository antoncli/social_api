import { IsNotEmpty, IsString } from 'class-validator';

export class AddDto {
  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  text: string;
}
