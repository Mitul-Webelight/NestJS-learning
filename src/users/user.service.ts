import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './user.schema';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async addUser(createUserDto: CreateUserDTO): Promise<IUser> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async getAllUser(): Promise<IUser[]> {
    const user = await this.userModel.find();
    return user;
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    return await this.userModel.findOne({ username }).exec();
  }

  async getUserById(id: string): Promise<IUser> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOneUser(id: string): Promise<IUser> {
    return await this.userModel.findById(id);
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
