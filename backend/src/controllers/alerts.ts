import { Context } from "hono";
import { Alerts } from "../models/alerts";
import { createAlertType, editAlertType } from "../validate/alerts";

export const getAlerts = async (c: Context) => {
  const db = c.req.query("db") || "3A";
  const alert = await Alerts(db);
  const data = await alert.find();
  return c.json({ alerts: data });
};

export const getAlert = async (c: Context) => {
  const id = c.req.param("id");
  const db = c.req.query("db") || "3A";
  const alert = await Alerts(db);
  const data = await alert.findById(id);
  if(!data) return c.text("Alert not found", 400)
  return c.json({ alert: data });
};

export const createAlert = async (
  c: CustomContext<"form", createAlertType>
) => {
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
};

export const editAlert = async (c: CustomContext<"form", editAlertType>) => {
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
  let data = (await alert.findById(id)) as Alerts;

  if (!data) {
    return c.text("Alert not found", 400);
  }
  
  if (data.createdBy != userId ? role != 2 : false) {
    return c.text("You are not Authorised to perform this action", 400);
  }

  data = (await alert.findByIdAndUpdate(
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
  )) as Alerts;

  return c.json({ alert: data });
};
