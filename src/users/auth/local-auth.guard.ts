import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private jwtservice: JwtService) {}
  canActivate(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest();
    const tokenHeader = request.header('Authorization');

    if (!tokenHeader) {
      throw new Error('Authorization header is missing');
    }

    const token = tokenHeader.replace('Bearer ', '');

    const decoded = this.jwtservice.verify(token, {
      secret: 'NestJS-Learning',
    });
    return decoded;
  }
}
