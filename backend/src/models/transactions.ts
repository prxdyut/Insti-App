import { Schema, InferSchemaType, model, SchemaType } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: "Users", required: true },
    mode: { type: String, enum: ["offline", "online"], default: "online" },
    note: { type: String },
    success: {
      order_id: { type: String },
      payment_id: { type: String },
      createdAt: {type: Date, default: new Date()}
    },
    rzpTempOrderId: { type: String },
    failure: [
      {
        order_id: { type: String },
        payment_id: { type: String },
        createdAt: {type: Date, default: new Date()}
      },
    ],
    amount: { type: Object, required: true },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type Transactions = InferSchemaType<typeof schema>;
export const Transactions = defineModel("Transactions", schema);
