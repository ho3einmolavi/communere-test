import { UserSchema } from './../schemas/user.schema';
import { UserComponent } from 'src/components/user.component';
import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserComponent, AuthService],
})
export class UserModule {}
