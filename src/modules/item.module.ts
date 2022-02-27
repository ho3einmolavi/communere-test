import { UserSchema } from './../schemas/user.schema';
import { ItemSchema } from './../schemas/item.schema';
import { ItemComponent } from './../components/item.component';
import { Module } from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { ItemController } from '../controllers/item.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Item', schema: ItemSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [ItemController],
  providers: [ItemService, ItemComponent],
})
export class ItemModule {}
