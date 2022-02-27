import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UserSignupDto {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'username must be at least 3 characters long',
  })
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Password' })
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  password: string;
}
