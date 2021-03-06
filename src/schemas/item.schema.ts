import { ItemStatus } from './../common/enums';
import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema(
  {
    title: String,
    user_id: mongoose.Schema.Types.ObjectId,
    description: String,
    status: {
      type: Number,
      enum: Object.values(ItemStatus).filter((el) => typeof el === 'number'),
      default: ItemStatus.TODO,
      required: true,
    },
    due_date: Date,
  },
  { timestamps: true },
);

ItemSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.user_id;
  return obj;
};
