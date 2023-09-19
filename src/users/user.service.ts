import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  async addUser(createUserDto: CreateUserDTO): Promise<IUser> {
    try {
      const newUser = new this.userModel(createUserDto);
      return newUser.save();
    } catch (e) {
      console.log(e);
    }
  }

  async getAllUser(): Promise<IUser[]> {
    const user = await this.userModel.find();
    return user;
  }

  async getUserById(id: string): Promise<IUser> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOneUser(loginUserDto: LoginUserDto): Promise<IUser | null> {
    return await this.userModel
      .findOne({
        username: loginUserDto.username,
        password: loginUserDto.password,
      })
      .exec();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    return updatedUser;
  }

  async deleteUser(id: string): Promise<IUser> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
