import { Injectable, BadRequestException } from '@nestjs/common';

import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(data: {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    status: string;
  }): Promise<any> {
    const existedUser = await this.userModel
      .findOne({ email: data.email })
      .exec();

    if (existedUser) {
      throw new BadRequestException('Email address already taken .');
    }

    let user = new User();

    user._id = new mongoose.Types.ObjectId();
    user.username = data.username;
    user.password = data.password;
    user.email = data.email;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.status = data.status;

    let newUser = await this.userModel.create(user);
    return newUser.save();
  }

  async findMany(): Promise<User[]> {
    const users = await this.userModel.find({}).exec();
    return users;
  }

  async findUnique(condition: {}): Promise<User> {
    const user = await this.userModel.findOne(condition).exec();
    return user;
  }

  async findById(_id: string): Promise<User> {
    const user = await this.userModel.findById(_id).exec();
    return user;
  }
}
