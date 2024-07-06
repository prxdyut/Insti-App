import { Context } from "hono";
import { createScoresType } from "../validate/scores";
import { Scores } from "../models/scores";
import { Users } from "../models/users";

export const getScores = async (c: Context) => {
  const db = c.req.query("db") || "3A";

  try {
    const Score = await Scores(db);
    const data = await Score.find({ deleted: false });
    if (!data) throw "Score not found";

    return c.json({ scores: data }, 200);
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const getScore = async (c: Context) => {
  const db = c.req.query("db") || "3A";
  const UId = c.req.param("UId");

  try {
    const Score = await Scores(db);
    let data = await Score.find({
      "obtained.student": UId,
      deleted: false,
    });

    const res = data.map((_) => ({
      ..._._doc,
      obtained: _.obtained.find((__: any) => __.student == UId)?.score || 0,
    }));

    return c.json({ scores: res }, 200);
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const createScores = async (
  c: CustomContext<"form", createScoresType>
) => {
  const db = c.req.query("db") || "3A";
  const {
    subject,
    total,
    title,
    date,
    "files_questions[]": questions,
    "files_answers[]": answers,
    "obtained[]": obtainedArr,
  } = c.req.valid("form");
  const { id: userId } = c.get("jwtPayload");
  let data;
  
  try {
    const User = await Users(db);
    const users = await User.find({ role: 0 });

    if (users.length != obtainedArr.length) throw "Error with obtained marks";

    let obtained: { score: number; student: string }[] = [];
    for (let i = 0; i < obtainedArr.length; i++) {
      const score = obtainedArr[i];
      if (score) {
        obtained.push({ student: users[i]._id, score });
      }
    }

    const Score = await Scores(db);
    data = await Score.insertMany([
      {
        subject,
        total,
        title,
        date,
        files: {
          questions,
          answers,
        },
        obtained,
        createdBy: userId,
      },
    ]);

    return c.json({}, 200);
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const deleteScore = async (c: Context) => {
  const id = c.req.param("id");
  const { id: userId, role } = c.get("jwtPayload");
  const db = c.req.query("db") || "3A";
  let data;

  try {
    const Score = await Scores(db);
    data = await Score.findOne({ _id: id, deleted: false });

    if (!data) {
      throw "Score not found";
    }

    if (data.createdBy != userId && role != 2) {
      throw "You are not Authorised to perform this action";
    }

    data = await Score.findByIdAndUpdate(
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
