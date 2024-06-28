import { Context } from "hono";
import { Users } from "../models/users";
import {
  LoginUserType,
  createUserType,
  editUserType,
  resetPasswordType,
} from "../validate/users";
import { hashPassword } from "../utils";
import checkPassword from "../utils/checkPassword";
import getPerformance from "../utils/getPerformance";
import { sign } from "hono/jwt";
import { SECRET } from "../variables";

export const getUsers = async (c: Context) => {
  try {
    const db = c.req.query("db") || "3A";

    const users = await Users(db);
    const data = await users.find();

    return c.json({
      users: data,
    });
  } catch (error: any) {
    return c.text(`${error.message}`, 400);
  }
};

export const getUser = async (c: Context) => {
  try {
    const db = c.req.query("db") || "3A";
    const id = c.req.param("id");

    const users = await Users(db);
    const data = await users.findById(id);

    return c.json({
      user: data,
    });
  } catch (error: any) {
    return c.text(`${error.message}`, 400);
  }
};

export const createUser = async (c: CustomContext<"form", createUserType>) => {
  try {
    const formData = c.req.valid("form");
    const { first, last, unencryptedPassword, role, phone, email } = formData;
    const password = await hashPassword(unencryptedPassword);

    const db = c.req.query("db") || "3A";

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
        email,
      },
    ]);

    return c.json({
      user: data,
    });
  } catch (error: any) {
    return c.text(`${error.message}`, 400);
  }
};

export const editUser = async (c: CustomContext<"form", editUserType>) => {
  try {
    const formData = c.req.valid("form");
    const { first, last, role, phone } = formData;

    const id = c.req.param("id");
    const db = c.req.query("db") || "3A";

    const users = await Users(db);
    const data = await users.findByIdAndUpdate(id, {
      name: { first, last },
      role,
      phone,
    });

    return c.json({
      user: data,
    });
  } catch (error: any) {
    return c.text(`${error.message}`, 400);
  }
};

export const resetPassword = async (
  c: CustomContext<"form", resetPasswordType>
) => {
  try {
    const formData = c.req.valid("form");
    const { newPassword, oldPassword, id } = formData;
    let start = performance.now(),
      end = performance.now();

    const db = c.req.query("db") || "3A";
    const user = await Users(db);
    let data = await user.findById(id);

    const { password } = data;
    if (!password) {
      return c.text(`Invalid Password`, 400);
    }

    const isCorrectPassword = await checkPassword(oldPassword, password);
    if (!isCorrectPassword) {
      return c.text(`Invalid Password`, 400);
    }

    const encryptedPassword = await hashPassword(newPassword);
    data = await user.findByIdAndUpdate(id, { password: encryptedPassword });
    end = performance.now();

    return c.json({
      message: "Changed Password Successfully",
      time: getPerformance(start, end),
    });
  } catch (error: any) {
    return c.text(`${error.message}`, 400);
  }
};

export const loginUser = async (c: CustomContext<"form", LoginUserType>) => {
  try {
    const formData = c.req.valid("form");
    const { unencryptedPassword, id } = formData;
    let start = performance.now(),
      end = performance.now();

    const db = c.req.query("db") || "3A";

    const user = await Users(db);
    let data = await user.findById(id);

    const { password } = data;
    if (!password) {
      return c.text(`Invalid User`, 400);
    }

    const isCorrectPassword = await checkPassword(
      unencryptedPassword,
      password
    );
    if (!isCorrectPassword) {
      return c.text(`Invalid Password`, 400);
    }

    const payload = {
      id: data._id,
      role: data.role,
      exp: (Math.floor(Date.now() / 1000) + 60) * 1440 * 7 * 4 * 2,
    };

    const token = await sign(payload, SECRET);
    end = performance.now();

    return c.json({
      token,
      message: "Logged in Successfully",
      time: getPerformance(start, end),
    });
  } catch (error: any) {
    return c.text(`${error.message}`, 400);
  }
};