import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema(
  {
    assignmentId: { type: Schema.ObjectId, ref: "Assignments", required: true },
    description: { type: String, required: true },
    files: [{ type: Schema.ObjectId, ref: "Files" }],
    status: {
      value: { type: Number, enum: [0, 1, 2], default: 0, required: true },
      remark: { type: String },
      updated: { type: Date },
    },
    late: { type: Boolean },
    createdBy: { type: Schema.ObjectId, ref: "Users", required: true },
  },
  { timestamps: true }
);

export type Submissions = InferSchemaType<typeof schema>;
export const Submissions = defineModel("Submissions", schema);
