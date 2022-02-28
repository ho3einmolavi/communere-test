import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, Types } from 'mongoose';
import { IItem } from 'src/schemas/interfaces/item.interface';
@Injectable()
export class ItemComponent {
  constructor(@InjectModel('Item') private readonly ItemModel: Model<IItem>) {}

  async create(item_fields: any): Promise<IItem> {
    const createdItem = new this.ItemModel(item_fields);
    return await createdItem.save();
  }

  async findItems(filters: FilterQuery<IItem>): Promise<IItem[]> {
    return await this.ItemModel.find(filters);
  }

  async findOneItemById(id: Types.ObjectId): Promise<IItem> {
    return await this.ItemModel.findOne({ _id: id });
  }

  async updateOneItemById(
    id: Types.ObjectId,
    item_fields: any,
  ): Promise<Boolean> {
    await this.ItemModel.updateOne({ _id: id }, item_fields);
    return true;
  }
}
