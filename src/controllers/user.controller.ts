import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiBadRequestResponse({ description: 'validation error' })
  @ApiBody({
    type: UserSignupDto,
    description: 'sign up user body',
  })
  @ApiOperation({
    summary: 'sign up',
    description: 'sign up user based on username and password',
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
  @ApiBadRequestResponse({ description: 'validation error' })
  @ApiBody({
    type: UserSigninDto,
    description: 'sign in user body',
  })
  @ApiOperation({
    summary: 'sign in',
    description: 'sign in user based on username and password',
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
