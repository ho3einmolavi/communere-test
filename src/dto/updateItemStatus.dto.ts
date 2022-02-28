import { ItemStatus } from './../common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateItemStatusDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'status', required: true })
  @IsEnum(Object.values(ItemStatus).filter((el) => typeof el === 'number'), {
    message: `status must be one of the following: ${Object.values(
      ItemStatus,
    ).filter(
      (el) => typeof el === 'number',
    )}. 0 for TODO, 1 for IN_PROGRESS, 2 for DONE`,
  })
  status: number;
}
