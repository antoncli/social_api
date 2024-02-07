import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  email: string;

  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  password: string;
}
