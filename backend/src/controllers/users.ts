import { Context } from "hono";
import { Users } from "../models/users";
import {
  LoginUserType,
  SetInitPassword,
  createUserType,
  editUserType,
  resetPasswordType,
} from "../validate/users";
import { hashPassword } from "../utils";
import checkPassword from "../utils/checkPassword";
import getPerformance from "../utils/getPerformance";
import { decode, sign, verify } from "hono/jwt";
import { ON_SERVER, SECRET } from "../variables";
import createMailId from "../utils/createMailId";
import sendMail from "../utils/sendMail";
import resetPasswordContent from "../contents/resetPassword";
import { add } from "date-fns";
import modifyMailPassword from "../utils/modifyMailPassword";
import generateRandomPassword from "../utils/generateRandomPassword";

export const getUsers = async (c: Context) => {
  try {
    const db = c.req.query("db") || "3A";
    const users = await Users(db);
    const data = await users.find();
    if (!data.length) throw "No users found";

    return c.json({
      users: data,
    });
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const getUser = async (c: Context) => {
  try {
    const db = c.req.query("db") || "3A";
    const id = c.req.param("id");

    const users = await Users(db);
    const data = await users.findById(id);
    if (!data) throw `User not found for #${id}`;

    return c.json({
      user: data,
    });
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const createUser = async (c: CustomContext<"form", createUserType>) => {
  try {
    const formData = c.req.valid("form");
    const { first, last, role, phone, backup_email } = formData;
    let randomPassword = generateRandomPassword();
    let password = await hashPassword(randomPassword);

    const db = c.req.query("db") || "3A";

    const mail_slug = (
      (first + last + Math.round(Math.random() * 100)) as string
    ).toLowerCase();

    const main_email = (mail_slug + "@" + Bun.env.MAIL_DOMAIN) as string;
    const payload = {
      email: main_email,
      type: "set-password",
      exp: add(new Date(), { weeks: 1 }).getTime(),
    };

    const token = await sign(payload, SECRET);
    const passwordSetLink = `https://${
      Bun.env.FRONTEND_URL as string
    }/setPassword?token=${token}`;

    if (ON_SERVER) {
      const mailcow = await createMailId(
        mail_slug,
        first + " " + last,
        randomPassword
      );

      const success = !Boolean(
        mailcow.some((obj: any) => obj.type === "danger")
      );
      if (!success) {
        throw "Error in mail account generation";
      }

      const info = await sendMail(
        backup_email,
        "Password Set Link!",
        resetPasswordContent(first + " " + last, passwordSetLink)
      );
      console.log(info);
    }

    const users = await Users(db);
    const data = await users.insertMany([
      {
        name: {
          first,
          last,
        },
        password,
        role,
        phone,
        email: { backup: backup_email, main: main_email },
      },
    ]);

    return c.json({
      user: data,
      token,
      passwordSetLink,
    });
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const editUser = async (c: CustomContext<"form", editUserType>) => {
  try {
    const formData = c.req.valid("form");
    const { first, last, role, phone, backup_email } = formData;

    const id = c.req.param("id");
    const db = c.req.query("db") || "3A";

    const users = await Users(db);
    const data = await users.findByIdAndUpdate(
      id,
      {
        name: { first, last },
        role,
        phone,
        email: { backup: backup_email },
      },
      { new: true }
    );

    return c.json({
      user: data,
    });
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const resetPassword = async (
  c: CustomContext<"form", resetPasswordType>
) => {
  try {
    const formData = c.req.valid("form");
    const id = c.req.param("id");
    const { newPassword, oldPassword } = formData;

    const db = c.req.query("db") || "3A";
    const user = await Users(db);
    let data = await user.findById(id);

    const { password } = data;
    if (!password) {
      throw "Invalid Password";
    }

    const isCorrectPassword = await checkPassword(oldPassword, password);
    if (!isCorrectPassword) {
      throw "Password is not correct";
    }

    const encryptedPassword = await hashPassword(newPassword);
    data = await user.findByIdAndUpdate(id, { password: encryptedPassword });

    return c.json({
      message: "Changed Password Successfully",
    });
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const setInitPassword = async (
  c: CustomContext<"form", SetInitPassword>
) => {
  try {
    const formData = c.req.valid("form");
    const { unencryptedPassword, token } = formData;
    const {
      payload: { email, expiry },
    } = decode(token);

    const isVerifiedToken = await verify(token, SECRET);
    if (!isVerifiedToken) {
      throw "Invalid Token";
    }

    const db = c.req.query("db") || "3A";
    const user = await Users(db);
    let data = await user.findOne({ "email.main": email });

    if (!data) {
      throw "Invalid User";
    }

    const mailcow = await modifyMailPassword(
      unencryptedPassword,
      email as string
    );
    
    const success = !Boolean(mailcow.some((obj: any) => obj.type === "danger"));
    if (!success) {
      throw "Error in Changing mail password";
    }

    const encryptedPassword = await hashPassword(unencryptedPassword);
    data = await user.findOneAndUpdate(
      { "email.main": email },
      { password: encryptedPassword }
    );

    return c.json({
      message: "Password Set Successfully",
    });
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const loginUser = async (c: CustomContext<"form", LoginUserType>) => {
  try {
    const formData = c.req.valid("form");
    const { unencryptedPassword, email } = formData;

    const db = c.req.query("db") || "3A";

    const user = await Users(db);
    let data = await user.findOne({ "email.main": email });

    const { password } = data;

    if (!data) {
      throw "Invalid User";
    }

    const isCorrectPassword = await checkPassword(
      unencryptedPassword,
      password
    );
    if (!isCorrectPassword) {
      throw "Invalid Password";
    }

    const payload = {
      id: data._id,
      role: data.role,
      type: "login",
      exp: (Math.floor(Date.now() / 1000) + 60) * 1440 * 7 * 4 * 2,
    };

    const token = await sign(payload, SECRET);

    return c.json({
      token,
    });
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};
