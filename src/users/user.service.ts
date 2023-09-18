import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getById(id: ObjectId) {
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

  async findOne(id: ObjectId) {
    return await this.userModel.findOne(id);
  }

  async findManyById(usersId: ObjectId) {
    return await this.userModel
      .find({ _id: { $in: usersId } })
      .select('username')
      .exec();
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    await this.userModel.updateOne(
      {
        _id: id,
      },
      {
        name: {
          username: updateUserDto.username,
          email: updateUserDto.email,
          password: updateUserDto.password,
        },
      },
    );

    const updatedUser = await this.getById(id);
    return updatedUser;
  }

  async delete(id: ObjectId) {
    return await this.userModel.deleteOne({ _id: id });
  }
}
