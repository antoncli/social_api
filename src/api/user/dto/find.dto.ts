import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FindDto {
  @IsString()
  // @ts-ignore
  input: string;

  @IsNumber()
  @IsNotEmpty()
  // @ts-ignore
  page: number;

  @IsNumber()
  @IsNotEmpty()
  // @ts-ignore
  limit: number;
}
