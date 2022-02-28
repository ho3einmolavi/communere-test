import { UpdateItemStatusDto } from './../dto/updateItemStatus.dto';
import { ItemStatus } from './../common/enums';
import { AuthGuard } from './../guards/authentication.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { response } from 'src/common/utils';
import { ItemService } from '../services/item.service';
import { CreateItemDto } from 'src/dto/createItem.dto';
import { Types } from 'mongoose';

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

  @Get('/filter')
  @ApiOkResponse({ description: 'success' })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async filterItems(
    @Query('status') status: ItemStatus,
    @Query('due_date') due_date: Date,
    @Req() request: any,
  ) {
    try {
      const filters = {
        ...(status && { status }),
        ...(due_date && { due_date }),
      };
      const items = await this.itemService.filterItems(filters, request.user);
      return response(items);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post('/update-status/:item_id')
  @ApiOkResponse({ description: 'item status updated' })
  @ApiBody({
    type: UpdateItemStatusDto,
    description: 'update item status body',
  })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async updateItemStatus(
    @Param('item_id') item_id: Types.ObjectId,
    @Body() updateItemStatusDto: UpdateItemStatusDto,
    @Req() request: any,
  ) {
    try {
      await this.itemService.updateItemStatus(
        item_id,
        updateItemStatusDto.status,
        request.user,
      );
      return response(null, 'item status updated');
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
