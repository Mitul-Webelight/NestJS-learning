import { IsNotEmpty, IsString } from 'class-validator';
// import { ObjectId } from 'mongoose';

export class LoginUserDto {
  id?: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
