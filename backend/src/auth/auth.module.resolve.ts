import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

@ObjectType()
export class User {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId | null;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  status: string;

  @Field()
  token: string;
  
  @Field()
  refreshToken: string;

  @Field()
  expiresIn: number;
}

@ObjectType()
export class SmUser {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId | null;

  @Field()
  email: string;

  @Field()
  username: string;
}
