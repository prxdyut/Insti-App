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

  let data;
  try {
    data = await Assignment.findById(id);
    if (!data) {
      throw "Assignment not found";
    }

    data = await Submission.find({ assignmentId: id, createdBy: userId });
    if (!data.length) {
      throw "Submissions not found";
    }

    return c.json({ Submission: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
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
  
  let data;
  try {
    data = await Assignment.findById(assignmentId);
    if (!data) {
      throw "Assignment not found";
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
  } catch (error: any) {
    return c.text(error, 400);
  }
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

  let data;
  try {
    data = await Submission.findById(submissionId);
    if (!data) {
      throw "Submission not found";
    }

    if (data.assignmentId != assignmentId) {
      throw "Submission not found for this Assignment";
    }

    data = await Assignment.findById(data.assignmentId);
    if (!data) {
      throw "Assignment not found";
    }

    if (data.createdBy != userId && role != 2) {
      throw "You can't modify Assignment Submission Status";
    }

    data = await Submission.findByIdAndUpdate(submissionId, {
      status: {
        remark,
        value: status,
        updated: new Date(),
      },
    });

    return c.json({ Submission: data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};
