import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { response } from 'src/common/utils';
import { UserSignupDto } from 'src/dto/userSignup.dto';
import { UserService } from '../services/user.service';

@ApiTags('api/user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @ApiCreatedResponse({ description: 'user created' })
  @ApiBody({
    type: UserSignupDto,
    description: 'sign up user body',
  })
  @HttpCode(201)
  async signUp(@Body() userSignupDto: UserSignupDto) {
    try {
      const res = await this.userService.signUp(userSignupDto);
      return response(res, 'user created');
    } catch (error) {
      console.log(error.status);
      throw new HttpException(error.message, error.status);
    }
  }
}
