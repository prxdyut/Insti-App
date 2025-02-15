import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  uid: {
    card: { type: String },
    tag: { type: String },
  },
  password: { type: String, required: true },
  role: { type: Number, required: true },
  phone: { type: String, required: true },
  customer_id: { type: String },
  email: {
    main: { type: String, required: true },
    backup: { type: String, required: true },
  },
  restrict: { type: Boolean, required: true, default: false },
  meta: { type: Object },
  batch: { type: String },
  fee: {
    total: { type: Number },
    deduction: { type: Number },
    note: { type: String },
  },
  lastLogIn: [
    {
      date: { type: Date, required: true },
      ip: { type: String, required: true },
      device: { type: String, required: true },
    },
  ],
});

export type Users = InferSchemaType<typeof schema>;
export const Users = defineModel("Users", schema);
// export const Users = () => defineModel("Users", schema)("common");
