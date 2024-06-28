import { Context } from "hono";
import { Replies } from "../models/replies";
import { createReplyType } from "../validate/replies";

export const getReplies = async (c: Context) => {
  const doubtId = c.req.param("DId");
  const db = c.req.query("db") || "3A";
  const Reply = await Replies(db);
  const data = await Reply.find({ doubtId });
  if (!data) return c.text("Replies not found", 400);
  return c.json({ Replies: data });
};

export const createReply = async (
  c: CustomContext<"form", createReplyType>
) => {
  const { replyTo, description, "files[]": files } = c.req.valid("form");
  const doubtId = c.req.param("DId");
  const { id: userId } = c.get("jwtPayload");
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
};
