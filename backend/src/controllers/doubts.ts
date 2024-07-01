import { Context } from "hono";
import { Doubts } from "../models/doubts";
import { createDoubtType, editDoubtType } from "../validate/doubts";

export const getDoubts = async (c: Context) => {
  try {
    const db = c.req.query("db") || "3A";
    const doubt = await Doubts(db);
    const data = await doubt.find();
    return c.json({ Doubts: data });
  } catch (error: any) {
    return c.text(error, 400) ; }
};

export const getDoubt = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const db = c.req.query("db") || "3A";
    const Doubt = await Doubts(db);
    const data = await Doubt.findById(id);
    if (!data) {
      throw "Doubt not found";
    }
    return c.json({ Doubt: data });
  } catch (error: any) {
    return c.text(error, 400) ; }
};

export const createDoubt = async (
  c: CustomContext<"form", createDoubtType>
) => {
  try {
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
  } catch (error: any) {
    return c.text(error, 400) ; }
};

export const editDoubt = async (c: CustomContext<"form", editDoubtType>) => {
  try {
    const id = c.req.param("id");
    const { title, description, "files[]": files, subject } = c.req.valid("form");
    const { id: userId } = c.get("jwtPayload");

    const db = c.req.query("db") || "3A";
    const Doubt = await Doubts(db);
    let data = await Doubt.findById(id);

    if (!data) {
      throw "Doubt not found";
    }

    if (data.createdBy !== userId) {
      throw "You are not authorized to perform this action";
    }

    data = await Doubt.findByIdAndUpdate(
      id,
      { title, description, files, subject },
      { new: true }
    );

    return c.json({ Doubt: data });
  } catch (error: any) {
    return c.text(error, 400) ; }
};
