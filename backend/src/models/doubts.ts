import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema({
  title: { type: String, required: true },
  subject: { type: Number, required: true },
  description: { type: String, required: true },
  files: [{ type: Schema.ObjectId, ref: "Files" }],
  totalReplies: { type: Number, required: true, default: 0 },
  deleted: { type: Boolean, default: false },
  createdBy: { type: Schema.ObjectId, ref: "Users", required: true },
},
{ timestamps: true });

export type Doubts = InferSchemaType<typeof schema>;
export const Doubts = defineModel("Doubts", schema);
