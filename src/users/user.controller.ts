import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { ObjectId } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { BcryptService } from './auth/bcrypt.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly bcryptService: BcryptService,
  ) {}

  @Post('auth/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post()
  async addUser(@Body() createUserDto: CreateUserDTO) {
    try {
      const hashedPassword = await this.bcryptService.hashingPassword(
        createUserDto.password,
      );
      createUserDto.password = hashedPassword;
      return this.userService.addUser(createUserDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  async getAllUser() {
    return this.userService.getAllUser();
  }

  @UseGuards(LocalAuthGuard)
  @Get('/:id')
  async getOneUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UseGuards(LocalAuthGuard)
  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
