import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema({
  subject: { type: Number, required: true },
  date: { type: Date, required: true },
  time: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  createdBy: { type: Schema.ObjectId, ref: "Users", required: true },
});

export type Schedules = InferSchemaType<typeof schema>;
export const Schedules = defineModel("Schedules", schema);
