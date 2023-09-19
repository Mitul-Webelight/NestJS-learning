import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { BcryptModule } from './auth/bcrypt.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from './auth/bcrypt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BcryptModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService, BcryptService],
})
export class UserModule {}
