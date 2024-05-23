import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signIn.dto';
import { UsersService } from 'src/users/user.service';
import { EXPIRES_TIME } from 'src/utils/constants';
import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.usersService.findMany();
  }

  async signin(data: SigninDto): Promise<{
    user: User;
    token: string;
    refreshToken: string;
    expiresIn: number;
  }> {
    const user = await this.usersService.findUnique({ email: data.email });

    if (user) {
      const passwordIsCorrect = await bcrypt.compare(
        data.password,
        user.password,
      );

      if (passwordIsCorrect) {
        const token = this.jwtService.sign(
          { sub: user._id },
          {
            expiresIn: '1h',
            secret: process.env.JWT_TOKEN || 'randomsecurestring',
          },
        );

        const refreshToken = this.jwtService.sign(
          { sub: user._id },
          {
            expiresIn: '7d',
            secret: process.env.JWT_REFRESH_TOKEN || 'randomsecurestring',
          },
        );

        const expiresIn = new Date().setTime(
          new Date().getTime() + EXPIRES_TIME,
        );

        return { user, token, refreshToken, expiresIn };
      }
    }
    throw new Error('Email or password is incorrect');
  }

  async me(token: string): Promise<User | null> {
    if (token) {
      const data = this.jwtService.decode(token, { json: true }) as {
        sub: unknown;
      };
      if (data?.sub && mongoose.isObjectIdOrHexString(data?.sub)) {
        const user = await this.usersService.findUnique({
          id: Number(data.sub),
        });
        return user || null;
      }
    }
    return null;
  }

  async refresh(data: any): Promise<{
    user: User;
    token: string;
    refreshToken: string;
    expiresIn: number;
  }> {
    let refreshToken = data.refreshToken;

    const result = (await this.jwtService.decode(refreshToken, {
      json: true,
    })) as {
      sub: unknown;
    };

    if (result?.sub && mongoose.isObjectIdOrHexString(result?.sub)) {
      const user = await this.usersService.findById(String(result.sub));

      if (!user || !user._id) {
        throw new UnauthorizedException();
      }
      console.log('new refresh token for user : ', user._id);

      const token = this.jwtService.sign(
        { sub: user._id },
        {
          expiresIn: '1h',
          secret: process.env.JWT_TOKEN || 'randomsecurestring',
        },
      );

      refreshToken = this.jwtService.sign(
        { sub: user._id },
        {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_TOKEN || 'randomsecurestring',
        },
      );
      const expiresIn = new Date().setTime(new Date().getTime() + EXPIRES_TIME);
      return { user: user, token, refreshToken, expiresIn };
    }

    throw new UnauthorizedException();
  }
}
