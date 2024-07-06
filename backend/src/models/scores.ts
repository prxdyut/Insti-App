import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema({
  title: { type: String, required: true },
  subject: { type: Number, required: true },
  date: { type: Date, required: true },
  obtained: [
    {
      student: { type: Schema.ObjectId, ref: "Users", required: true },
      score: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  files: {
    questions: [{ type: Schema.ObjectId, ref: "Files" }],
    answers: [{ type: Schema.ObjectId, ref: "Files" }],
  },
  createdBy: { type: Schema.ObjectId, ref: "Users", required: true },
  deleted: { type: Boolean, default: false },
},
{ timestamps: true });

export type Scores = InferSchemaType<typeof schema>;
export const Scores = defineModel("Scores", schema);