import * as mongoose from "mongoose";

export const ItemSchema = new mongoose.Schema(
  {
    title: String,
    user_id: mongoose.Schema.Types.ObjectId,
    description: String,
    status: String,
    due_date: String,
  },
  { timestamps: true }
);
