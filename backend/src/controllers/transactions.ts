import { Context } from "hono";
import { Transactions } from "../models/transactions";
import { Users } from "../models/users";
import {
  CreateTransactionRequestType,
  CreateValidTransactionType,
} from "../validate/transactions";
import Razorpay = require("razorpay");
import * as crypto from "crypto";

const rzp = new Razorpay({
  key_id: Bun.env.KEY_ID as string,
  key_secret: Bun.env.KEY_SECRET as string,
});

export const getFees = async (c: Context) => {
  const userId = c.req.param("UId");
  const db = c.req.query("db") || "3A";

  try {
    const Transaction = await Transactions(db);
    const User = await Users(db);

    const transactions = await Transaction.find({ userId });
    const data = await User.findById(userId);

    if (!data.fee) throw "Fee data not provided";

    return c.json({ transactions, fee: data.fee }, 200);
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const getTransactionOptions = async (c: Context) => {
  const id = c.req.param("id");
  const db = c.req.query("db") || "3A";

  try {
    const Transaction = await Transactions(db);
    const transactions = await Transaction.findById(id);

    if (!transactions) {
      throw "Request not Found";
    }

    if (transactions.paid) {
      return c.text("Transaction already done", 200);
    }

    const User = await Users(db);
    let user = await User.findById(transactions.userId);

    if (!user.customer_id) {
      const customer = await rzp.customers.create({
        name: user.name.first + " " + user.name.last,
        email: user.email.main,
        contact: user.phone,
        fail_existing: 0,
        notes: {
          userId: user._id,
        },
      });

      user = await User.findByIdAndUpdate(
        transactions.userId,
        {
          customer_id: customer.id,
        },
        { new: true }
      );
    }

    const rzpOrder = await rzp.orders.create({
      amount: transactions.amount * 100, // rzp format with paise
      currency: "INR",
      receipt: "receipt#" + transactions._id, //Receipt no that corresponds to this Order,
      payment_capture: true,
      customer_id: user.customer_id,
      notes: {
        message: transactions.note,
      },
    });

    const rzpOptions = {
      key: Bun.env.KEY_ID as string,
      name: "Insti App",
      amount: transactions.amount * 100,
      description: "Test Transaction",
      currency: "INR",
      order_id: rzpOrder.id,
      customer_id: user.customer_id,
      remember_customer: true,
      readonly: {
        name: true,
        email: true,
        contact: true,
      },
      modal: {
        confirm_close: true,
      },
      notes: {
        userId: transactions.userId,
        message: transactions.note,
      },
      theme: {
        color: "#3399cc",
      },
    };

    await Transaction.findByIdAndUpdate(
      id,
      {
        rzpTempOrderId: rzpOrder.id,
      },
      { new: true }
    );

    return c.json({ options: rzpOptions }, 200);
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const createValidTransaction = async (
  c: CustomContext<"form", CreateValidTransactionType>
) => {
  const db = c.req.query("db") || "3A";

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    c.req.valid("form");

  try {
    const Transaction = await Transactions(db);

    if (razorpay_signature) {
      const sha = crypto.createHmac("sha256", Bun.env.KEY_SECRET as string);
      sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const digest = sha.digest("hex");
      if (digest !== razorpay_signature) {
        throw "Transaction is not legit!";
      }

      await Transaction.findOneAndUpdate(
        { rzpTempOrderId: razorpay_order_id },
        {
          success: {
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
          },
          paid: true,
          $unset: { rzpTempOrderId: 1 },
        },
        { new: true }
      );
    } else {
      await Transaction.findOneAndUpdate(
        { rzpTempOrderId: razorpay_order_id },
        {
          $push: {
            failure: {
              order_id: razorpay_order_id,
              payment_id: razorpay_payment_id,
            },
          },
        },
        { new: true }
      );
    }

    return c.json(
      {
        msg: "success",
      },
      200
    );
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const createTransactionRequest = async (
  c: CustomContext<"form", CreateTransactionRequestType>
) => {
  const { amount, transactionId, note, paid, mode } = c.req.valid("form");
  const userId = c.req.param("UId");

  const db = c.req.query("db") || "3A";

  try {
    const Transaction = await Transactions(db);
    const data = await Transaction.insertMany([
      {
        userId,
        amount,
        transactionId,
        note,
        paid,
        mode,
      },
    ]);

    console.log({ amount, transactionId, note, paid, mode });

    return c.json({ data }, 200);
  } catch (error: any) {
    return c.text(error, 400);
  }
};
