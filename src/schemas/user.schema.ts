import { HttpException, HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: async function (username: string) {
          const user = await this.constructor.findOne({ username });
          if (user) {
            if (this._id === user._id) {
              return true;
            }
            // throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
            return false;
          }
          return true;
        },
        message: 'Username already exists',
      },
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
);
