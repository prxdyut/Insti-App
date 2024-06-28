import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema({
  doubtId: { type: Schema.ObjectId, ref: "Doubts", required: true },
  replyTo: { type: Schema.ObjectId, ref: "Replies" },
  description: { type: String, required: true },
  files: [{ type: Schema.ObjectId, ref: "Files" }],
  createdBy: { type: Schema.ObjectId, ref: "Users", required: true },
});

export type Replies = InferSchemaType<typeof schema>;
export const Replies = defineModel("Replies", schema);
