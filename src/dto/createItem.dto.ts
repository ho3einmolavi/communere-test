import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'username' })
  title: string;

  @IsOptional()
  @ApiProperty({ type: String, description: 'description' })
  description: string;

  @IsOptional()
  @ApiProperty({ type: Number, description: 'status' })
  due_date: string;
}
