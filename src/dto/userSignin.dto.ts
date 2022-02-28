import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserSigninDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'username', required: true })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Password', required: true })
  password: string;
}
