import { Document } from 'mongoose';

export interface IItem extends Document {
  title: string;
  user_id: string;
  description: string;
  status: number;
  due_date: Date;
}
