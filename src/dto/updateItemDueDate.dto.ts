import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class UpdateItemDueDateDto {
  @IsNotEmpty()
  @ApiProperty({ type: Date, description: 'item due date', required: true })
  @IsDateString()
  due_date: Date;
}
