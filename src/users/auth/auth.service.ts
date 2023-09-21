import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dto/login-user.dto';
import { SignupUserDto } from '../dto/signup-user.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
    @Res() res,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.findOne(loginUserDto.username);
    if (!user) {
      throw { message: 'Invalid Crentials', statusCode: 401 };
    }

    const passwordMatch = await this.bcryptService.comparePassword(
      loginUserDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw { message: 'Invalid Crentials', statusCode: 401 };
    }
    return { message: 'Authentication successful', statusCode: 200 };
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      await this.validateUser(loginUserDto);
      const payload = { username: loginUserDto.username };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: 'NestJS-Learning',
        }),
        message: 'Authentication successful',
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);
      throw { message: 'Server Error', statusCode: 500 };
    }
  }

  async signup(signupUserDto: SignupUserDto) {
    try {
      const createdUser = new this.userModel({
        _id: new mongoose.Types.ObjectId(),
        name: {
          firstName: signupUserDto.firstName,
          lastName: signupUserDto.lastName,
        },
        username: signupUserDto.username,
        email: signupUserDto.email,
        password: await this.bcryptService.hashingPassword(
          signupUserDto.password,
        ),
      });
      return createdUser.save();
    } catch (error) {
      console.log(error);
      throw { message: 'Error creating user', statusCode: 500 };
    }
  }
}
