import { Schema, InferSchemaType, model } from "mongoose";
import connectDB from "../config/db";
import defineModel from "../utils/defineModel";

const schema = new Schema({
  name: { type: String, required: true },
  s3: {
    bucket: { type: String },
    key: { type: String },
  },
  url: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
  createdBy: { type: Schema.ObjectId, ref: "Users", required: true },
});

export type Files = InferSchemaType<typeof schema>;
export const Files = defineModel("Files", schema);