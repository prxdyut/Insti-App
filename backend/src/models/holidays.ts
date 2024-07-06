import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  createdBy: { type: Schema.ObjectId, ref: "Users", required: true },
  deleted: { type: Boolean, default: false },
},
{ timestamps: true });

export type Holidays = InferSchemaType<typeof schema>;
export const Holidays = defineModel("Holidays", schema);
