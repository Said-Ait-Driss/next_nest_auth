import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.model';
import { UsersService } from 'src/users/user.service';

@Module({
  imports: [UserModule, JwtModule.register({ secret: process.env.JWT || "randomsecurestring" })],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
