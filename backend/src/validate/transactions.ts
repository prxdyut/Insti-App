import { z } from "zod";

export const validateCreateTransactionRequest = z.object({
  amount: z.coerce.number(),
  transactionId: z.coerce.string().optional(),
  note: z.coerce.string().optional(),
  paid: z.coerce.boolean().optional(),
  mode: z.enum(["offline", "online"]).optional(),
});

export type CreateTransactionRequestType = z.infer<
  typeof validateCreateTransactionRequest
>;

export const validateCreateValidTransaction = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string().optional(),
});

export type CreateValidTransactionType = z.infer<
  typeof validateCreateValidTransaction
>;
