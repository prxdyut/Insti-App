import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  files: [{ type: Schema.ObjectId, ref: "Files" }],
  button: {
    label: { type: String },
    url: { type: String },
  },
  campaignId: { type: String },
  createdBy: { type: Schema.ObjectId, ref: "Users", required: true },
});

export type Alerts = InferSchemaType<typeof schema>;
export const Alerts = defineModel("Alerts", schema);
