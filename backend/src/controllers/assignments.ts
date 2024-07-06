import { Context } from "hono";
import { Assignments, AssignmentsType } from "../models/assignments";
import {
  createAssignmentType,
  editAssignmentType,
} from "../validate/assignments";

export const getAssignments = async (c: Context) => {
  const db = c.req.query("db") || "3A";

  try {
    const Assignment = await Assignments(db);
    const data = await Assignment.find({ deleted: false });

    if (!data) throw "Assignments not found";

    return c.json({ assignments: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const getAssignment = async (c: Context) => {
  const id = c.req.param("id");
  const db = c.req.query("db") || "3A";

  try {
    const Assignment = await Assignments(db);
    const data = await Assignment.findOne({ _id: id, deleted: false });

    if (!data) throw "Assignment not found";

    return c.json({ assignment: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const createAssignment = async (
  c: CustomContext<"form", createAssignmentType>
) => {
  const {
    title,
    description,
    "files[]": files,
    subject,
    scheduleEnd,
    scheduleStart,
  } = c.req.valid("form");
  const { id: userId } = c.get("jwtPayload");
  const db = c.req.query("db") || "3A";
  let data;

  try {
    const Assignment = await Assignments(db);
    data = await Assignment.insertMany([
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
        createdBy: userId,
      },
    ]);

    return c.json({});
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const editAssignment = async (
  c: CustomContext<"form", editAssignmentType>
) => {
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

  try {
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

    return c.json({});
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const deleteAssignment = async (c: Context) => {
  const id = c.req.param("id");
  const { id: userId, role } = c.get("jwtPayload");
  const db = c.req.query("db") || "3A";
  let data;

  try {
    const assignment = await Assignments(db);
    data = await assignment.findOne({_id: id, deleted: false});

    if (!data) throw "Alert not found";

    if (data.createdBy !== userId && role !== 2) {
      throw "You are not authorized to perform this action";
    }

    data = await assignment.findByIdAndUpdate(
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
