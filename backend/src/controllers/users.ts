import { Context } from "hono";
import { Users } from "../models/users";
import {
  LoginUserType,
  createUserType,
  editUserType,
  resetPasswordLinkType,
  resetPasswordType,
} from "../validate/users";
import { hashPassword } from "../utils";
import checkPassword from "../utils/checkPassword";
import { decode, sign, verify } from "hono/jwt";
import { ON_SERVER, SECRET } from "../variables";
import createMailId from "../utils/createMailId";
import sendMail from "../utils/sendMail";
import resetPasswordContent from "../contents/resetPassword";
import { add } from "date-fns";
import modifyMailPassword from "../utils/modifyMailPassword";
import generateRandomPassword from "../utils/generateRandomPassword";
import randomNum from "../utils/randomNum";
import { ResetTokens } from "../models/resetTokens";

export const getUsers = async (c: Context) => {
  const db = c.req.query("db") || "3A";

  try {
    const users = await Users(db);
    const data = await users.find();

    return c.json({
      users: data,
    });
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const getUser = async (c: Context) => {
  const db = c.req.query("db") || "3A";
  const id = c.req.param("id");
  try {
    const users = await Users(db);
    const data = await users.findById(id);

    if (!data) throw "No user Found";

    return c.json({
      user: data,
    });
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const createUser = async (c: CustomContext<"form", createUserType>) => {
  const formData = c.req.valid("form");
  const { first, last, role, phone, backup_email, batch } = formData;
  try {
    if (role == 0 && !batch) throw "Plz provide batch";

    let randomPassword = generateRandomPassword();
    let password = await hashPassword(randomPassword);

    const db = c.req.query("db") || "3A";

    let mail_slug = ((first + last + randomNum(100)) as string)
      .toLowerCase()
      .replace(" ", "-");
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
        batch,
      },
    ]);

    return c.json({
      user: data,
      token,
      randomPassword,
    });
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const editUser = async (c: CustomContext<"form", editUserType>) => {
  const formData = c.req.valid("form");
  const { first, last, role, phone, backup_email } = formData;
  const id = c.req.param("id");
  const db = c.req.query("db") || "3A";

  try {
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

    if (!data) throw "Could not edit User";

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
  const formData = c.req.valid("form");
  const id = c.req.param("id");
  const { newPassword, oldPassword } = formData;
  const db = c.req.query("db") || "3A";

  try {
    const user = await Users(db);
    let data = await user.findById(id);

    if (!data) {
      throw "Invalid Password";
    }
    const { password } = data;

    const isCorrectPassword = await checkPassword(oldPassword, password);
    if (!isCorrectPassword) {
      throw "Password is not correct";
    }

    const encryptedPassword = await hashPassword(newPassword);
    data = await user.findByIdAndUpdate(
      id,
      { password: encryptedPassword },
      { new: true }
    );
    if (!data) throw "Could not reset password";

    return c.json({
      message: "Changed Password Successfully",
    });
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const resetPasswordLink = async (
  c: CustomContext<"form", resetPasswordLinkType>
) => {
  const formData = c.req.valid("form");
  const { unencryptedPassword, token: resetToken } = formData;
  const {
    payload: { email, type },
  } = decode(resetToken);
  const db = c.req.query("db") || "3A";

  if (type != "set-password") throw "Invalid Token";

  try {
    const ResetToken = await ResetTokens(db);
    const isUsed = await ResetToken.findOne({ token: resetToken });
    if (isUsed) throw "Token Already Used";

    const isVerifiedToken = await verify(resetToken, SECRET);
    if (!isVerifiedToken) throw "Token Already Expired";

    const user = await Users(db);
    let data = await user.findOne({ "email.main": email });

    if (!data) {
      throw "Invalid User";
    }

    if (ON_SERVER) {
      const mailcow = await modifyMailPassword(
        unencryptedPassword,
        email as string
      );
      const success = !Boolean(
        mailcow.some((obj: any) => obj.type === "danger")
      );
      if (!success) {
        throw "Error in Changing mail password";
      }
    }

    const encryptedPassword = await hashPassword(unencryptedPassword);
    data = await user.findOneAndUpdate(
      { "email.main": email },
      { password: encryptedPassword },
      { new: true }
    );

    if (!data) {
      throw "Error in Changing account password";
    }

    const payload = {
      id: data._id,
      role: data.role,
      type: "login",
      exp: add(new Date(), { months: 1 }).getTime(),
    };

    const token = await sign(payload, SECRET);

    await ResetToken.insertMany([
      {
        token: resetToken,
        email,
      },
    ]);

    return c.json({
      message: "Loggedin Successfully",
      token,
    });
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const loginUser = async (c: CustomContext<"form", LoginUserType>) => {
  const formData = c.req.valid("form");
  const { unencryptedPassword, email } = formData;

  const db = c.req.query("db") || "3A";

  try {
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
      exp: add(new Date(), { months: 1 }).getTime(),
    };

    const token = await sign(payload, SECRET);

    return c.json({
      token,
      userId: data._id,
      firstName: data.name.first,
      lastName: data.name.last,
      role: data.role,
    });
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};
