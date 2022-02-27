import { IUser } from './../schemas/interfaces/user.interface';
import { ItemComponent } from './../components/item.component';
import { Injectable } from '@nestjs/common';
import { CreateItemDto } from 'src/dto/createItem.dto';

@Injectable()
export class ItemService {
  constructor(private readonly itemComponent: ItemComponent) {}

  async createItem(createItemDto: CreateItemDto, user: IUser) {
    return await this.itemComponent.create({
      ...createItemDto,
      user_id: user._id,
    });
  }
}
