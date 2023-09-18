import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { BcryptService } from './bcrypt.service';
import { UserSchema } from '../user.schema';
import { UserModule } from '../user.module';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'NestJS-learning',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthService, BcryptService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
