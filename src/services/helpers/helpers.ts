import { IUser } from 'src/schemas/interfaces/user.interface';
import { IItem } from 'src/schemas/interfaces/item.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

export function isUserOwnedTheItem(item: IItem, user: IUser) {
  if (item.user_id.toString() !== user._id.toString()) {
    throw new HttpException(
      'You are not allowed to perform this action',
      HttpStatus.FORBIDDEN,
    );
  }
}
