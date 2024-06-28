import { Context } from "hono";
import { createFileType } from "../validate/files";
import { Files } from "../models/files";

export const getFile = async (c: Context) => {
  const id = c.req.param("id");
  const db = c.req.query("db") || "3A";
  const File = await Files(db);
  const data = await File.findById(id);
  if (!data) return c.text("File not found", 400);
  return c.json({ File: data });
};

export const createFile = async (c: CustomContext<"form", createFileType>) => {
  const { name, url, size, type, s3Bucket, s3Key } = c.req.valid("form");
  const { id: userId } = c.get("jwtPayload");
  const db = c.req.query("db") || "3A";
  const File = await Files(db);
  const data = await File.insertMany([
    {
      name,
      url,
      size,
      type,
      s3: { bucket: s3Bucket, key: s3Key },
      createdBy: userId,
    },
  ]);

  return c.json({ File: data });
};
