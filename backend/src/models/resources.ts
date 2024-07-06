import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema({
  title: { type: String, required: true },
  subject: { type: Number },
  priority: { type: Number, enum: [0, 1], default: 0, required: true },
  file: { type: Schema.ObjectId, ref: "Files" },
  createdBy: { type: Schema.ObjectId, ref: "Users", required: true },
  deleted: { type: Boolean, default: false },
},
{ timestamps: true });

export type Resources = InferSchemaType<typeof schema>;
export const Resources = defineModel("Resources", schema);
