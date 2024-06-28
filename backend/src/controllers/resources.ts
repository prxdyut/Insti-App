import { Context } from "hono";
import { Resources } from "../models/resources";
import { createResourceType, editResourceType } from "../validate/resource";

export const getResources = async (c: Context) => {
  const db = c.req.query("db") || "3A";
  const Resource = await Resources(db);
  const data = await Resource.find();
  return c.json({ Resources: data });
};

export const getResource = async (c: Context) => {
  const id = c.req.param("id");
  const db = c.req.query("db") || "3A";
  const Resource = await Resources(db);
  const data = await Resource.findById(id);
  if (!data) return c.text("Resource not found", 400);
  return c.json({ Resource: data });
};

export const createResource = async (
  c: CustomContext<"form", createResourceType>
) => {
  const { title, subject, priority, file } = c.req.valid("form");
  const { id: userId } = c.get("jwtPayload");
  const db = c.req.query("db") || "3A";
  const Resource = await Resources(db);
  const data = await Resource.insertMany([
    {
      title,
      subject,
      priority,
      file,
      createdBy: userId,
    },
  ]);

  return c.json({ Resource: data });
};

export const editResource = async (
  c: CustomContext<"form", editResourceType>
) => {
  const id = c.req.param("id");
  const { title, subject, priority, file } = c.req.valid("form");
  const { id: userId, role } = c.get("jwtPayload");

  const db = c.req.query("db") || "3A";
  const Resource = await Resources(db);
  let data = (await Resource.findById(id)) as Resources;

  if (!data) {
    return c.text("Resource not found", 400);
  }

  if (data.createdBy != userId ? role != 2 : false) {
    return c.text("You are not Authorised to perform this action", 400);
  }

  data = (await Resource.findByIdAndUpdate(
    id,
    {
      title,
      subject,
      priority,
      file,
    },
    { new: true }
  )) as Resources;

  return c.json({ Resource: data });
};
