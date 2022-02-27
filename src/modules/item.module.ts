import { Module } from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { ItemController } from '../controllers/item.controller';

@Module({
  controllers: [ItemController],
  providers: [ItemService]
})
export class ItemModule {}
