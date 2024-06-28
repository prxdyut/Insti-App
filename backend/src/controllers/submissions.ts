import { Context } from "hono";
import { Submissions } from "../models/submissions";
import { Assignments } from "../models/assignments";
import {
  createSubmissionStatusType,
  createSubmissionType,
} from "../validate/submissions";
import { isBefore } from "date-fns";

export const getSubmissions = async (c: Context) => {
  const id = c.req.param("id");
  const db = c.req.query("db") || "3A";
  const { id: userId } = c.get("jwtPayload");
  const Submission = await Submissions(db);
  const Assignment = await Assignments(db);

  let data = await Assignment.findById(id);
  if (!data) return c.text("Assignment not found", 400);

  data = await Submission.find({ assignmentId: id, createdBy: userId });
  if (!data.length) return c.text("Submissions not found", 400);

  return c.json({ Submission: data });
};

export const createSubmission = async (
  c: CustomContext<"form", createSubmissionType>
) => {
  const { description, "files[]": files } = c.req.valid("form");
  const assignmentId = c.req.param("id");
  const { id: userId } = c.get("jwtPayload");
  const db = c.req.query("db") || "3A";
  const Submission = await Submissions(db);
  const Assignment = await Assignments(db);
  let data = await Assignment.findById(assignmentId);

  if (!data) {
    return c.text("Assignment not found", 400);
  }

  const late = isBefore(data.scheduleStart, new Date());

  data = await Submission.insertMany([
    {
      assignmentId,
      description,
      files,
      late,
      createdBy: userId,
    },
  ]);
  await Assignment.updateOne(
    { _id: assignmentId },
    { $inc: { totalSubmissions: 1 } }
  );

  return c.json({ Submission: data });
};

export const createSubmissionStatus = async (
  c: CustomContext<"form", createSubmissionStatusType>
) => {
  const { remark, status } = c.req.valid("form");
  const assignmentId = c.req.param("Aid");
  const submissionId = c.req.param("Sid");
  const { id: userId, role } = c.get("jwtPayload");

  const db = c.req.query("db") || "3A";

  const Submission = await Submissions(db);
  const Assignment = await Assignments(db);

  let data = await Submission.findById(submissionId);

  if (!data) {
    return c.text("Submission not found", 400);
  }

  if (data.assignmentId != assignmentId) {
    return c.text("Submission not found for this Assignment", 400);
  }

  data = await Assignment.findById(data.assignmentId);
  if (!data) {
    return c.text("Assignment not found", 400);
  }

  if (data.createdBy != userId ? role != 2 : false) {
    return c.text("You cant modify Assignment Submission Status", 400);
  }

  data = await Submission.findByIdAndUpdate(submissionId, {
    status: {
      remark,
      value: status,
      updated: new Date(),
    },
  });

  return c.json({ Submission: data });
};
