import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'username' })
  title: string;

  @IsOptional()
  @ApiProperty({ type: String, description: 'description' })
  description: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: Date, description: 'due date' })
  due_date: Date;
}
