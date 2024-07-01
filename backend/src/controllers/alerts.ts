import { Context } from "hono";
import { Alerts } from "../models/alerts";
import { createAlertType, editAlertType } from "../validate/alerts";

export const getAlerts = async (c: Context) => {
  try {
    const db = c.req.query("db") || "3A";
    const alert = await Alerts(db);
    const data = await alert.find();
    return c.json({ alerts: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const getAlert = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const db = c.req.query("db") || "3A";
    const alert = await Alerts(db);
    const data = await alert.findById(id);
    if (!data) {
      throw "Alert not found";
    }
    return c.json({ alert: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const createAlert = async (
  c: CustomContext<"form", createAlertType>
) => {
  try {
    const {
      title,
      subtitle,
      description,
      "files[]": files,
      buttonLabel,
      buttonUrl,
    } = c.req.valid("form");
    const payload = c.get("jwtPayload");
    const db = c.req.query("db") || "3A";
    const alert = await Alerts(db);
    const data = await alert.insertMany([
      {
        title,
        subtitle,
        description,
        files,
        button: {
          label: buttonLabel,
          url: buttonUrl,
        },
        createdBy: payload?.id,
      },
    ]);

    return c.json({ alert: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const editAlert = async (c: CustomContext<"form", editAlertType>) => {
  try {
    const id = c.req.param("id");
    const {
      title,
      subtitle,
      description,
      "files[]": files,
      buttonLabel,
      buttonUrl,
    } = c.req.valid("form");
    const { id: userId, role } = c.get("jwtPayload");

    const db = c.req.query("db") || "3A";
    const alert = await Alerts(db);
    let data = await alert.findById(id);

    if (!data) {
      throw "Alert not found";
    }

    if (data.createdBy !== userId && role !== 2) {
      throw "You are not authorized to perform this action";
    }

    data = await alert.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        description,
        files,
        button: {
          label: buttonLabel,
          url: buttonUrl,
        },
      },
      { new: true }
    );

    return c.json({ alert: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};
