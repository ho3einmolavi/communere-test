import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class UpdateItemDueDateDto {
  @IsNotEmpty()
  @ApiProperty({ type: Date, description: 'item due date' })
  @IsDateString()
  due_date: Date;
}
