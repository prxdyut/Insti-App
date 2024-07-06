import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema({
  db: { type: String, required: true },
  access: [{ type: Schema.ObjectId, ref: "Users", required: true }],
});

export type Batches = InferSchemaType<typeof schema>;
export const Batches = () => defineModel("Batches", schema)("common");
