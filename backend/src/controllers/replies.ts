import { Context } from "hono";
import { Replies } from "../models/replies";
import { createReplyType } from "../validate/replies";

export const getReplies = async (c: Context) => {
  const doubtId = c.req.param("DId");
  const db = c.req.query("db") || "3A";

  try {
    const Reply = await Replies(db);
    const data = await Reply.find({ doubtId, deleted: false });
    if (!data || data.length === 0) {
      throw "Replies not found";
    }
    return c.json({ Replies: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const createReply = async (
  c: CustomContext<"form", createReplyType>
) => {
  const { replyTo, description, "files[]": files } = c.req.valid("form");
  const doubtId = c.req.param("DId");
  const { id: userId } = c.get("jwtPayload");
  
  try {
    const db = c.req.query("db") || "3A";
    const Reply = await Replies(db);
    const data = await Reply.insertMany([
      {
        doubtId,
        description,
        files,
        replyTo,
        createdBy: userId,
      },
    ]);

    return c.json({ Reply: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const deleteReply = async (c: Context) => {
  const id = c.req.param("id");
  const { id: userId } = c.get("jwtPayload");
  let data;

  try {
    const db = c.req.query("db") || "3A";
    const Reply = await Replies(db);
    data = await Reply.findOne({ _id: id, deleted: false });

    if (!data) {
      throw "Reply not found";
    }

    if (data.createdBy !== userId) {
      throw "You are not authorized to perform this action";
    }

    data = await Reply.findByIdAndUpdate(id, { deleted: true }, { new: true });

    return c.json({});
  } catch (error: any) {
    return c.text(error, 400);
  }
};
