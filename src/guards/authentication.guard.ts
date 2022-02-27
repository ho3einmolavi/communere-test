import {
  CanActivate,
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { IUser } from 'src/schemas/interfaces/user.interface';

@Injectable()
export class BuyerAuthGuard implements CanActivate {
  constructor(@InjectModel('User') private readonly UserModel: Model<IUser>) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization)
      throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    const { username } = await this.validateToken(
      request.headers.authorization,
    );
    const user = await this.UserModel.findOne({ username });
    request.user = user;
    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const token = auth.split(' ')[1];
    try {
      return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    } catch (err) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
