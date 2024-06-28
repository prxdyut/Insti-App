import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema({
  range: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  overall: { type: Number, required: true },
  attendance: {
    present: { type: Number, required: true },
    absent: { type: Number, required: true },
  },
  scores: [
    {
      subject: { type: Number, required: true },
      value: { type: Number, required: true },
    },
  ],
  userId: { type: Schema.ObjectId, ref: "Users", required: true },
});

export type Performances = InferSchemaType<typeof schema>;
export const Performances = defineModel("Performances", schema);
