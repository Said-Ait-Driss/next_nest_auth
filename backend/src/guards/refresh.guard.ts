import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CLIENT_ORIGINS } from 'src/utils/constants';

@Injectable()
export class RefreshAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req || null;

    const cookiesVerified = this.verifyCookies(req);

    if (!cookiesVerified) throw new UnauthorizedException();

    const token = this.getTokenFromHeader(req);

    if (!token) throw new UnauthorizedException();

    try {
      const data = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_TOKEN || 'randomsecurestring',
      });
      return data;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private getTokenFromHeader(request: Request): string {
    return (
      request.headers.authorization?.replace('Bearer ', '') ||
      request.cookies.refreshToken ||
      ''
    );
  }

  private verifyCookies(request: Request): boolean {
    if (
      !request?.cookies?.token ||
      !request?.cookies?.refreshToken ||
      !request?.cookies?.expiresIn 
      //|| !request?.cookies['next-auth.callback-url']
    ) {
      return false;
    }

    // const origin = request.cookies['next-auth.callback-url'];
    // const baseUrl = origin.split('/').slice(0, 3).join('/');

    // if (!CLIENT_ORIGINS.includes(baseUrl)) {
    //   return false;
    // }

    return true;
  }
}
