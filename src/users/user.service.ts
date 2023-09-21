import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAll() {
    return this.userModel.find();
  }
  async getById(id: string): Promise<User> {
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

  async findOne(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name: {
          firstName: updateUserDto.firstName,
          lastName: updateUserDto.lastName,
          username: updateUserDto.username,
          email: updateUserDto.email,
        },
      },
      { new: true },
    );
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete({ _id: id });
  }
}
