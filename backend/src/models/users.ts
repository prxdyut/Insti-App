import { Schema, InferSchemaType, model } from "mongoose";
import defineModel from "../utils/defineModel";

const schema = new Schema(
  {
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    password: { type: String, required: true },
    role: { type: Number, required: true },
    phone: { type: String, required: true },
    email: {
      main: { type: String, required: true },
      backup: { type: String, required: true },
    },
    restrict: { type: Boolean, required: true, default: false },
    meta: { type: Object },
    lastLogIn: [
      {
        date: { type: Date, required: true },
        ip: { type: String, required: true },
        device: { type: String, required: true },
      },
    ],
  },
  {
    methods: {
      fullName() {
        return `${this.name?.first} ${this.name?.last}`;
      },
      async matchPassword(enteredPassword: string) {
        return Bun.password.verifySync(enteredPassword, this.password);
      },
    },
  }
);

export type Users = InferSchemaType<typeof schema>;
export const Users = defineModel("Users", schema);
