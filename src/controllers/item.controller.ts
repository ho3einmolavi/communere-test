import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemService } from '../services/item.service';

@ApiTags("api/item")
@Controller('api/item')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }
}
