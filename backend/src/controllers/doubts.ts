import { Context } from "hono";
import { Doubts } from "../models/doubts";
import { createDoubtType, editDoubtType } from "../validate/doubts";

export const getDoubts = async (c: Context) => {
  const db = c.req.query("db") || "3A";
  const doubt = await Doubts(db);
  const data = await doubt.find();
  return c.json({ Doubts: data });
};

export const getDoubt = async (c: Context) => {
  const id = c.req.param("id");
  const db = c.req.query("db") || "3A";
  const Doubt = await Doubts(db);
  const data = await Doubt.findById(id);
  if(!data) return c.text("Doubt not found", 400)
  return c.json({ Doubt: data });
};

export const createDoubt = async (
  c: CustomContext<"form", createDoubtType>
) => {
  const { title, description, "files[]": files, subject } = c.req.valid("form");
  const { id: userId } = c.get("jwtPayload");
  const db = c.req.query("db") || "3A";
  const Doubt = await Doubts(db);
  const data = await Doubt.insertMany([
    {
      title,
      description,
      files,
      subject,
      createdBy: userId,
    },
  ]);

  return c.json({ Doubt: data });
};

export const editDoubt = async (c: CustomContext<"form", editDoubtType>) => {
  const id = c.req.param("id");
  const { title, description, "files[]": files, subject } = c.req.valid("form");
  const { id: userId, role } = c.get("jwtPayload");

  const db = c.req.query("db") || "3A";
  const Doubt = await Doubts(db);
  let data = (await Doubt.findById(id)) as Doubts;

  if (!data) {
    return c.text("Doubt not found", 400);
  }

  if (data.createdBy != userId) {
    return c.text("You are not Authorised to perform this action", 400);
  }

  data = (await Doubt.findByIdAndUpdate(
    id,
    { title, description, files, subject },
    { new: true }
  )) as Doubts;

  return c.json({ Doubt: data });
};
