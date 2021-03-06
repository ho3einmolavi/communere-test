import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';
import { UserSignupDto } from 'src/dto/userSignup.dto';
import { IUser } from 'src/schemas/interfaces/user.interface';
@Injectable()
export class UserComponent {
  constructor(@InjectModel('User') private readonly UserModel: Model<IUser>) {}

  async createUser(userSignup: UserSignupDto): Promise<IUser> {
    const createdUser = new this.UserModel(userSignup);
    return await createdUser.save();
  }

  async findUser(user: FilterQuery<IUser>): Promise<IUser> {
    return await this.UserModel.findOne(user);
  }
}
