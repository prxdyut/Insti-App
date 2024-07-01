import { Context } from "hono";
import { Assignments, AssignmentsType } from "../models/assignments";
import {
  createAssignmentType,
  editAssignmentType,
} from "../validate/assignments";

export const getAssignments = async (c: Context) => {
  try {
    const db = c.req.query("db") || "3A";
    const Assignment = await Assignments(db);
    const data = await Assignment.find();
    return c.json({ Assignments: data });
  } catch (error: any) {
    return c.text(error, 400) ; }
};

export const getAssignment = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const db = c.req.query("db") || "3A";
    const Assignment = await Assignments(db);
    const data = await Assignment.findById(id);
    if (!data) {
      throw "Assignment not found";
    }
    return c.json({ Assignment: data });
  } catch (error: any) {
    return c.text(error, 400) ; }
};

export const createAssignment = async (
  c: CustomContext<"form", createAssignmentType>
) => {
  try {
    const {
      title,
      description,
      "files[]": files,
      subject,
      scheduleEnd,
      scheduleStart,
    } = c.req.valid("form");
    const payload = c.get("jwtPayload");
    const db = c.req.query("db") || "3A";
    const Assignment = await Assignments(db);
    const data = await Assignment.insertMany([
      {
        title,
        subject,
        description,
        files,
        schedule: {
          start: scheduleStart,
          end: scheduleEnd,
        },
        totalSubmissions: 0,
        createdBy: payload?.id,
      },
    ]);
  
    return c.json({ Assignment: data });
  } catch (error: any) {
    return c.text(error, 400) ; }
};

export const editAssignment = async (
  c: CustomContext<"form", editAssignmentType>
) => {
  try {
    const id = c.req.param("id");
    const {
      title,
      description,
      "files[]": files,
      subject,
      scheduleEnd,
      scheduleStart,
    } = c.req.valid("form");
    const { id: userId, role } = c.get("jwtPayload");
  
    const db = c.req.query("db") || "3A";
    const Assignment = await Assignments(db);
    let data = await Assignment.findById(id);
  
    if (!data) {
      throw "Assignment not found";
    }
  
    if (data.createdBy !== userId && role !== 2) {
      throw "You are not authorized to perform this action";
    }
  
    data = await Assignment.findByIdAndUpdate(
      id,
      {
        title,
        subject,
        description,
        files,
        schedule: {
          start: scheduleStart,
          end: scheduleEnd,
        },
      },
      { new: true }
    );
  
    return c.json({ Assignment: data });
  } catch (error: any) {
    return c.text(error, 400) ; }
};
