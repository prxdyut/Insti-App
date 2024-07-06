import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema({
  punches: [{ type: String, required: true }],
  date: { type: Date, required: true },
  deleted: { type: Boolean, default: false },
  userId: { type: Schema.ObjectId, ref: "Users", required: true },
},
{ timestamps: true });

export type Attendances = InferSchemaType<typeof schema>;
export const Attendances = defineModel("Attendances", schema);
