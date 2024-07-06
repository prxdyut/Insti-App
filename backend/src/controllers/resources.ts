import { Context } from "hono";
import { Resources } from "../models/resources";
import { createResourceType, editResourceType } from "../validate/resource";

export const getResources = async (c: Context) => {
  try {
    const db = c.req.query("db") || "3A";
    const Resource = await Resources(db);
    const data = await Resource.find();
    return c.json({ Resources: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const getResource = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const db = c.req.query("db") || "3A";
    const Resource = await Resources(db);
    const data = await Resource.findById(id);
    if (!data) {
      throw "Resource not found";
    }
    return c.json({ Resource: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const createResource = async (
  c: CustomContext<"form", createResourceType>
) => {
  try {
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
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const editResource = async (
  c: CustomContext<"form", editResourceType>
) => {
  try {
    const id = c.req.param("id");
    const { title, subject, priority, file } = c.req.valid("form");
    const { id: userId, role } = c.get("jwtPayload");

    const db = c.req.query("db") || "3A";
    const Resource = await Resources(db);
    let data = await Resource.findById(id);

    if (!data) {
      throw "Resource not found";
    }

    if (!(data.createdBy === userId && role === 2)) {
      throw "You are not authorized to perform this action";
    }

    data = await Resource.findByIdAndUpdate(
      id,
      {
        title,
        subject,
        priority,
        file,
      },
      { new: true }
    );

    return c.json({ Resource: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const deleteResource = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const { id: userId, role } = c.get("jwtPayload");

    const db = c.req.query("db") || "3A";
    const Resource = await Resources(db);
    let data = await Resource.findOne({ _id: id, deleted: false });

    if (!data) {
      throw "Resource not found";
    }

    if (!(data.createdBy === userId && role === 2)) {
      throw "You are not authorized to perform this action";
    }

    data = await Resource.findByIdAndUpdate(
      id,
      {
        deleted: true,
      },
      { new: true }
    );

    return c.json({});
  } catch (error: any) {
    return c.text(error, 400);
  }
};
