import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  private rounds = 10;
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUser(id: string) {
    return this.userModel.findById(id);
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ userName: username });
  }

  async registerUser(user: CreateUserDto) {
    let isUsernameTaken = await this.findUserByUsername(user.userName);
    let isEmailTaken = await this.userModel.findOne({email: user.email})

    const userDetails: User = {
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      passwordHash: bcrypt.hashSync(user.password, this.rounds),
      email: user.email,
    };
    if (isUsernameTaken !== null || isEmailTaken !== null) {
      return `Sorry there is already username/email already registered`;
    }
    return this.userModel.create(userDetails);
  }

  async updateUser(user: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(user);
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
