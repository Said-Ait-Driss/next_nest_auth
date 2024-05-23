import { Field, InputType } from '@nestjs/graphql';
import {
  MaxLength,
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

// const UserStatus: string =  'active' || 'inactive'  || 'suspended' ||'deleted'

@InputType()
export class CreateUserDto {
  @Field()
  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @MaxLength(255)
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  status: string;
}
