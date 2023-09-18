import { IsNotEmpty, IsString } from 'class-validator';
// import { ObjectId } from 'mongoose';

export class CreateUserDTO {
  id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
