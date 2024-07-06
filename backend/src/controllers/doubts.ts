import { Context } from "hono";
import { Doubts } from "../models/doubts";
import { createDoubtType, editDoubtType } from "../validate/doubts";

export const getDoubts = async (c: Context) => {
  const db = c.req.query("db") || "3A";

  try {
    const doubt = await Doubts(db);
    const data = await doubt.find({ deleted: false });

    if (!data) throw "Doubts not found";

    return c.json({ doubts: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const getDoubt = async (c: Context) => {
  const id = c.req.param("id");
  const db = c.req.query("db") || "3A";

  try {
    const Doubt = await Doubts(db);
    const data = await Doubt.findById({ _id: id, deleted: false });

    if (!data) throw "Doubt not found";

    return c.json({ doubt: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const createDoubt = async (
  c: CustomContext<"form", createDoubtType>
) => {
  const { title, description, "files[]": files, subject } = c.req.valid("form");
  const { id: userId } = c.get("jwtPayload");
  const db = c.req.query("db") || "3A";
  let data;

  try {
    const Doubt = await Doubts(db);
    data = await Doubt.insertMany([
      {
        title,
        description,
        files,
        subject,
        createdBy: userId,
      },
    ]);

    return c.json({});
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const editDoubt = async (c: CustomContext<"form", editDoubtType>) => {
  try {
    const id = c.req.param("id");
    const {
      title,
      description,
      "files[]": files,
      subject,
    } = c.req.valid("form");
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

    return c.json({});
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const deleteDoubt = async (c: Context) => {
  const id = c.req.param("id");
  const { id: userId } = c.get("jwtPayload");

  try {
    const db = c.req.query("db") || "3A";
    const Doubt = await Doubts(db);
    let data = await Doubt.findOne({ _id: id, deleted: false });

    if (!data) {
      throw "Doubt not found";
    }

    if (data.createdBy !== userId) {
      throw "You are not authorized to perform this action";
    }

    data = await Doubt.findByIdAndUpdate(id, { deleted: true }, { new: true });

    return c.json({});
  } catch (error: any) {
    return c.text(error, 400);
  }
};
