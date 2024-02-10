import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetDto {
  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  name: string;

  @IsNumber()
  @IsNotEmpty()
  // @ts-ignore
  page: number;

  @IsNumber()
  @IsNotEmpty()
  // @ts-ignore
  limit: number;
}
