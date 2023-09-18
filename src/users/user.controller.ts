import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { ObjectId } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @Post()
  async addUser(@Body() createUserDto: CreateUserDTO) {
    return this.userService.addUser(createUserDto);
  }

  @Get()
  async getAllUser() {
    return this.userService.getAllUser();
  }

  @Get('/:id')
  async getOneUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
