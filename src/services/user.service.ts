import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashPassword, isPasswordMatch } from 'src/common/utils';
import { UserComponent } from 'src/components/user.component';
import { UserSigninDto } from 'src/dto/userSignin.dto';
import { UserSignupDto } from 'src/dto/userSignup.dto';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userComponent: UserComponent,
    private readonly authService: AuthService,
  ) {}

  async signUp(userSignupDto: UserSignupDto): Promise<string> {
    const { username, password } = userSignupDto;
    const existingUser = await this.userComponent.findUser({
      username,
    });

    if (existingUser) {
      throw new HttpException(
        'Username already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    userSignupDto.password = await hashPassword(password);
    const user = await this.userComponent.createUser(userSignupDto);
    return await this.authService.signAccessToken(user.username);
  }

  async signIn(userSigninDto: UserSigninDto): Promise<string> {
    const { username, password } = userSigninDto;
    const user = await this.userComponent.findUser({
      username,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const is_password_match = await isPasswordMatch(password, user.password);
    if (!is_password_match) {
      throw new HttpException(
        'username or password is not match',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.authService.signAccessToken(user.username);
  }
}
