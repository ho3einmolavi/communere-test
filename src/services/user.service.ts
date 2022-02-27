import { Injectable } from '@nestjs/common';
import { hashPassword } from 'src/common/utils';
import { UserComponent } from 'src/components/user.component';
import { UserSignupDto } from 'src/dto/userSignup.dto';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userComponent: UserComponent,
    private readonly authService: AuthService,
  ) {}

  async signUp(userSignupDto: UserSignupDto) {
    userSignupDto.password = await hashPassword(userSignupDto.password);
    // throw new HttpException('Not implemented', 403);
    const user = await this.userComponent.createUser(userSignupDto);
    return await this.authService.signAccessToken(user.username);
  }
}
