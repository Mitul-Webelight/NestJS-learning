import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { BcryptService } from './bcrypt.service';
import { User, UserSchema } from '../user.schema';
import { UserModule } from '../user.module';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'NestJS-learning',
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    BcryptService,
    UserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
