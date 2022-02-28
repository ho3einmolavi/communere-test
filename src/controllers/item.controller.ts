import { UpdateItemDueDateDto } from './../dto/updateItemDueDate.dto';
import { UpdateItemStatusDto } from './../dto/updateItemStatus.dto';
import { ItemStatus } from './../common/enums';
import { AuthGuard } from './../guards/authentication.guard';
import {
  Body,
  Controller,
  Delete,
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
  ApiQuery,
  ApiParam,
  ApiOperation,
  ApiHeader,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { response } from 'src/common/utils';
import { ItemService } from '../services/item.service';
import { CreateItemDto } from 'src/dto/createItem.dto';
import { Types } from 'mongoose';

@ApiTags('api/item')
@Controller('api/item')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Post('/')
  @ApiCreatedResponse({ description: 'item created' })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized error if there is no sent token or sent invalid token',
  })
  @ApiBadRequestResponse({ description: 'validation error' })
  @ApiHeader({
    name: 'authorization',
    description: 'jwt access token for users. format: Bearer {token}',
    required: true,
  })
  @ApiBody({
    type: CreateItemDto,
    description: 'create item body',
  })
  @ApiOperation({
    summary: 'create item',
    description:
      'create item for user based on title, description and due date. only title is required',
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
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized error if there is no sent token or sent invalid token',
  })
  @ApiBadRequestResponse({ description: 'validation error' })
  @ApiHeader({
    name: 'authorization',
    description: 'jwt access token for users. format: Bearer {token}',
    required: true,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'item status',
    type: Number,
  })
  @ApiQuery({
    name: 'due_date',
    required: false,
    description: 'item due date',
    type: Date,
  })
  @ApiOperation({
    summary: 'filter items',
    description: 'filter items based on status and due date',
  })
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
  @ApiBadRequestResponse({ description: 'validation error' })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized error if there is no sent token or sent invalid token',
  })
  @ApiForbiddenResponse({
    description:
      'When the user tries to update an item that was not created by him/her',
  })
  @ApiHeader({
    name: 'authorization',
    description: 'jwt access token for users. format: Bearer {token}',
    required: true,
  })
  @ApiBody({
    type: UpdateItemStatusDto,
    description: 'update item status body',
  })
  @ApiParam({
    name: 'item_id',
    description: 'item id',
  })
  @ApiOperation({
    summary: 'update item status',
    description: 'update item status. it is possible to update status only',
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

  @Post('/update-due-date/:item_id')
  @ApiOkResponse({ description: 'item due date updated' })
  @ApiBadRequestResponse({ description: 'validation error' })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized error if there is no sent token or sent invalid token',
  })
  @ApiForbiddenResponse({
    description:
      'When the user tries to update an item that was not created by him/her',
  })
  @ApiHeader({
    name: 'authorization',
    description: 'jwt access token for users. format: Bearer {token}',
    required: true,
  })
  @ApiBody({
    type: UpdateItemDueDateDto,
    description: 'update item due date body',
  })
  @ApiParam({
    name: 'item_id',
    description: 'item id',
  })
  @ApiOperation({
    summary: 'update item due date',
    description: 'update item due date. it is possible to update due date only',
  })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async updateItemDueDate(
    @Param('item_id') item_id: Types.ObjectId,
    @Body() updateItemDueDateDto: UpdateItemDueDateDto,
    @Req() request: any,
  ) {
    try {
      await this.itemService.updateItemDueDate(
        item_id,
        updateItemDueDateDto.due_date,
        request.user,
      );
      return response(null, 'item due date updated');
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Delete('/delete/:item_id')
  @ApiOkResponse({ description: 'item deleted' })
  @ApiBadRequestResponse({ description: 'validation error' })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized error if there is no sent token or sent invalid token',
  })
  @ApiForbiddenResponse({
    description:
      'When the user tries to update an item that was not created by him/her',
  })
  @ApiHeader({
    name: 'authorization',
    description: 'jwt access token for users. format: Bearer {token}',
    required: true,
  })
  @ApiParam({
    name: 'item_id',
    description: 'item id',
  })
  @ApiOperation({
    summary: 'delete item',
    description: 'this api deletes an item',
  })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async deleteItem(
    @Param('item_id') item_id: Types.ObjectId,
    @Req() request: any,
  ) {
    try {
      await this.itemService.deleteItem(item_id, request.user);
      return response(null, 'item deleted');
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
