import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from 'src/users/user.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext | any ) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req || null;
    const token = this.getTokenFromHeader(req);
    if (!token) throw new UnauthorizedException();

    try {
      const data = this.jwtService.verify(token, {
        secret: process.env.JWT_TOKEN || 'randomsecurestring',
      });
      return data;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private getTokenFromHeader(request: Request): string {
    return (
      request.headers?.authorization?.replace('Bearer ', '') ||
      request.cookies.token ||
      ''
    );
  }
}
