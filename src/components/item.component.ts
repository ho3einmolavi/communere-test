import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';
import { IItem } from 'src/schemas/interfaces/item.interface';
@Injectable()
export class ItemComponent {
  constructor(@InjectModel('Item') private readonly ItemModel: Model<IItem>) {}

  async create(item_fields: any): Promise<IItem> {
    const createdItem = new this.ItemModel(item_fields);
    return await createdItem.save();
  }
}
