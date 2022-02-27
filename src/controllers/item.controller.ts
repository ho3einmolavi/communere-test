import { AuthGuard } from './../guards/authentication.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { response } from 'src/common/utils';
import { ItemService } from '../services/item.service';
import { CreateItemDto } from 'src/dto/createItem.dto';

@ApiTags('api/item')
@Controller('api/item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('/')
  @ApiCreatedResponse({ description: 'item created' })
  @ApiBody({
    type: CreateItemDto,
    description: 'create item body',
  })
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async createItem(@Body() createItemDto: CreateItemDto, @Req() request: any) {
    try {
      const item = await this.itemService.createItem(
        createItemDto,
        request.user,
      );
      return response(item, 'item created');
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
