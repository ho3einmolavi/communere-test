import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'username', required: true })
  title: string;

  @IsOptional()
  @ApiProperty({ type: String, description: 'description', required: false })
  description: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: Date, description: 'due date', required: false })
  due_date: Date;
}
