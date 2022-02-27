import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { response } from 'src/common/utils';
import { UserSigninDto } from 'src/dto/userSignin.dto';
import { UserSignupDto } from 'src/dto/userSignup.dto';
import { UserService } from '../services/user.service';

@ApiTags('api/user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @ApiCreatedResponse({ description: 'user signed up' })
  @ApiBody({
    type: UserSignupDto,
    description: 'sign up user body',
  })
  @HttpCode(201)
  async signUp(@Body() userSignupDto: UserSignupDto) {
    try {
      const access_token = await this.userService.signUp(userSignupDto);
      return response({ access_token }, 'user signed up');
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post('/signin')
  @ApiCreatedResponse({ description: 'user signed in' })
  @ApiBody({
    type: UserSigninDto,
    description: 'sign in user body',
  })
  @HttpCode(200)
  async signIn(@Body() userSigninDto: UserSigninDto) {
    try {
      const access_token = await this.userService.signIn(userSigninDto);
      return response({ access_token }, 'user signed in');
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
