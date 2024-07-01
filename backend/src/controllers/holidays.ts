import { Context } from "hono";
import { createHolidayType, editHolidayType } from "../validate/holidays";
import { Holidays } from "../models/holidays";

export const createHoliday = async (
  c: CustomContext<"form", createHolidayType>
) => {
  try {
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
  } catch (error: any) {
    return c.text(error, 400) ; }
};

export const editHoliday = async (
  c: CustomContext<"form", editHolidayType>
) => {
  try {
    const id = c.req.param("id");
    const { title, date } = c.req.valid("form");
    const { id: userId, role } = c.get("jwtPayload");
  
    const db = c.req.query("db") || "3A";
    const Holiday = await Holidays(db);
    let data = await Holiday.findById(id);
  
    if (!data) {
      throw "Holiday not found";
    }
  
    if (!(data.createdBy === userId && role === 2)) {
      throw "You are not authorized to perform this action";
    }
  
    data = await Holiday.findByIdAndUpdate(
      id,
      {
        title,
        date,
      },
      { new: true }
    );
  
    return c.json({ Holiday: data });
  } catch (error: any) {
    return c.text(error, 400) ; }
};
