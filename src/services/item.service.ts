import { ItemStatus } from './../common/enums';
import { IUser } from './../schemas/interfaces/user.interface';
import { ItemComponent } from './../components/item.component';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from 'src/dto/createItem.dto';
import { Types } from 'mongoose';
import { isUserOwnedTheItem } from './helpers/helpers';

@Injectable()
export class ItemService {
  constructor(private readonly itemComponent: ItemComponent) {}

  async createItem(createItemDto: CreateItemDto, user: IUser) {
    return await this.itemComponent.create({
      ...createItemDto,
      user_id: user._id,
    });
  }

  async filterItems(filters: any, user: IUser) {
    return await this.itemComponent.findItems({
      ...filters,
      user_id: user._id,
    });
  }

  async updateItemStatus(
    item_id: Types.ObjectId,
    status: ItemStatus,
    user: IUser,
  ) {
    const item = await this.itemComponent.findOneItemById(item_id);
    if(!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    isUserOwnedTheItem(item, user);
    return await this.itemComponent.updateOneItemById(item_id, { status });
  }

  async updateItemDueDate(
    item_id: Types.ObjectId,
    due_date: Date,
    user: IUser,
  ) {
    const item = await this.itemComponent.findOneItemById(item_id);
    if(!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    isUserOwnedTheItem(item, user);
    return await this.itemComponent.updateOneItemById(item_id, { due_date });
  }

  async deleteItem(item_id: Types.ObjectId, user: IUser) {
    const item = await this.itemComponent.findOneItemById(item_id);
    if(!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    isUserOwnedTheItem(item, user);
    return await this.itemComponent.deleteOneItemById(item_id);
  }
}
