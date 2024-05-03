import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetDto {
  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  owner: string;

  @IsNumber()
  @IsNotEmpty()
  // @ts-ignore
  page: number;

  @IsNumber()
  @IsNotEmpty()
  // @ts-ignore
  limit: number;
}
