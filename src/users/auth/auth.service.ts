// import { ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dto/login-user.dto';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string) {
    const user = await this.userService.findOneUser(id);
    if (!user) {
      throw { message: 'User not found', statusCode: 404 };
    }

    const passwordMatch = await this.bcryptService.comparePassword(
      user.password,
      user.password,
    );
    if (passwordMatch) {
      return { message: 'Authentication successful', statusCode: 200 };
    } else {
      throw { message: 'Incorrect password', statusCode: 401 };
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      await this.validateUser(loginUserDto.id);
      const payload = { username: loginUserDto.username };
      return {
        access_token: this.jwtService.sign(payload),
        message: 'Authentication successful',
        statusCode: 200,
      };
    } catch (error) {
      throw { message: 'Internal Server error', statusCode: 500 };
    }
  }
}
