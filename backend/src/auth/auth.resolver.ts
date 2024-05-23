import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Request } from 'express';
// import { User } from 'src/models/user.model'
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { SigninDto } from './dto/signIn.dto';
import { User } from 'src/users/user.schema';
import { User as _User, SmUser } from './auth.module.resolve';
import { RefreshAuthGuard } from 'src/guards/refresh.guard';
import { UsersService } from 'src/users/user.service';

@Resolver(() => _User)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Query(() => [_User])
  allUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }

  @Mutation(() => _User)
  createUser(@Args('data') data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }

  @Mutation(() => _User)
  async signin(
    @Args('data') data: SigninDto,
    @Context('req') req: Request,
  ): Promise<_User> {
    const { user, token, refreshToken, expiresIn } =
      await this.authService.signin(data);

    req.res?.cookie('token', token, { httpOnly: true });
    req.res?.cookie('refreshToken', refreshToken, { httpOnly: true });
    req.res?.cookie('expiresIn', expiresIn, { httpOnly: true });

    user.token = token;
    user.refreshToken = refreshToken;
    user.expiresIn = expiresIn;

    return user;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => _User)
  signOut(@Context('req') req: Request, @Context('user') user: User): User {
    req.res?.clearCookie('token', { httpOnly: true });
    req.res?.clearCookie('refreshToken', { httpOnly: true });
    return user;
  }

  @UseGuards(AuthGuard)
  @Query(() => SmUser)
  async me(@Context('req') req: Request): Promise<User> {
    return await this.userService.findUnique({});
  }

  @UseGuards(RefreshAuthGuard)
  @Query(() => _User)
  async refresh(@Context('req') req: Request): Promise<_User> {
      const { user, token, refreshToken, expiresIn } =
      await this.authService.refresh(req.cookies);

    req.res?.cookie('token', token, { httpOnly: true });
    req.res?.cookie('refreshToken', refreshToken, { httpOnly: true });
    req.res?.cookie('expiresIn', expiresIn, { httpOnly: true });

    user.token = token;
    user.refreshToken = refreshToken;
    user.expiresIn = expiresIn;

    return user;
  }
}
