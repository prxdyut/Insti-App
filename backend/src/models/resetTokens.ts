import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema(
  {
    token: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export type ResetTokens = InferSchemaType<typeof schema>;
export const ResetTokens = defineModel("Reset Tokens", schema);
