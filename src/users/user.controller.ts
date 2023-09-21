import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { AuthService } from './auth/auth.service';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Get()
  async getAllUser(@Res() res): Promise<User[]> {
    try {
      const getAllUser = await this.userService.getAll();
      return res.status(HttpStatus.OK).json(getAllUser);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Get('/:id')
  async getUser(@Param('id') id: string, @Res() res): Promise<User> {
    try {
      const getUser = await this.userService.getById(id);
      return res.status(HttpStatus.OK).json(getUser);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res,
  ): Promise<User> {
    try {
      const updateUser = await this.userService.update(id, updateUserDto);
      return res.status(HttpStatus.OK).json(updateUser);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res): Promise<User> {
    try {
      const deleteUser = await this.userService.delete(id);
      return res.status(HttpStatus.OK).json(deleteUser);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('auth/login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res): Promise<User> {
    try {
      const userLogin = await this.authService.login(loginUserDto);
      return res.status(HttpStatus.OK).json(userLogin);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('auth/signup')
  async signup(
    @Body() signupUserDto: SignupUserDto,
    @Res() res,
  ): Promise<User> {
    try {
      const userSignup = await this.authService.signup(signupUserDto);
      return res.status(HttpStatus.CREATED).json(userSignup);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
