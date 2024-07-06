import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema(
  {
    title: { type: String, required: true },
    subject: { type: Number, required: true },
    description: { type: String, required: true },
    files: [{ type: Schema.ObjectId, ref: "Files" }],
    totalSubmissions: { type: Number, required: true },
    schedule: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    createdBy: { type: Schema.ObjectId, ref: "Users", required: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type AssignmentsType = InferSchemaType<typeof schema>;
export const Assignments = defineModel("Assignments", schema);
