import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ObjectId } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user/:id')
  async getUser(@Param('id') id: ObjectId) {
    return this.userService.getById(id);
  }

  @Put('/user/:id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/user/:id')
  async delete(@Param('id') id: ObjectId) {
    return this.userService.delete(id);
  }
}
