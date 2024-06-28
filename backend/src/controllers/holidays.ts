import { Context } from "hono";
import { createHolidayType, editHolidayType } from "../validate/holidays";
import { Holidays } from "../models/holidays";

export const createHoliday = async (
  c: CustomContext<"form", createHolidayType>
) => {
  const { title, date } = c.req.valid("form");
  const { id: userId } = c.get("jwtPayload");
  const db = c.req.query("db") || "3A";
  const Holiday = await Holidays(db);
  const data = await Holiday.insertMany([
    {
      title,
      date,
      createdBy: userId,
    },
  ]);

  return c.json({ Holiday: data });
};

export const editHoliday = async (
  c: CustomContext<"form", editHolidayType>
) => {
  const id = c.req.param("id");
  const { title, date } = c.req.valid("form");
  const { id: userId, role } = c.get("jwtPayload");

  const db = c.req.query("db") || "3A";
  const Holiday = await Holidays(db);
  let data = (await Holiday.findById(id)) as Holidays;

  if (!data) {
    return c.text("Holiday not found", 400);
  }

  if (data.createdBy != userId ? role != 2 : false) {
    return c.text("You are not Authorised to perform this action", 400);
  }

  data = (await Holiday.findByIdAndUpdate(
    id,
    {
      title,
      date,
    },
    { new: true }
  )) as Holidays;

  return c.json({ Holiday: data });
};
