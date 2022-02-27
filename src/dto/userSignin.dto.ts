import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserSigninDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Password' })
  password: string;
}
