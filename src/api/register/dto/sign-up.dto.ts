import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  name: string;

  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  email: string;

  @IsString()
  @IsNotEmpty()
  // @ts-ignore
  password: string;
}
