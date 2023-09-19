import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneUser({
      username,
      password,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials 1');
    }
    const isPasswordValid = await this.bcryptService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials 2');
    }
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { username, password } = loginUserDto;

      const user = await this.validateUser(username, password);

      const payload = {
        username: user.username,
        password: user.password,
      };

      const token = this.jwtService.sign(payload);

      return {
        token: token,
        message: 'Authentication successful',
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);
      throw { message: 'Server error', statusCode: 500 };
    }
  }
}
