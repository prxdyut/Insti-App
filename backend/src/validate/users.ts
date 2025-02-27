import { z } from "zod";

export const validateCreateUser = z.object({
  first: z.string(),
  last: z.string(),
  batch: z.string().optional(),
  // unencryptedPassword: z.string(),
  role: z.coerce.number().min(0).max(2),
  phone: z.string(),
  backup_email: z.string().email(),
});
export type createUserType = z.infer<typeof validateCreateUser>;

export const validateEditUser = z.object({
  first: z.string().optional(),
  last: z.string().optional(),
  role: z.coerce.number().min(0).max(2).optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  backup_email: z.string().email().optional(),
});
export type editUserType = z.infer<typeof validateEditUser>;

export const validateResetPassword = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});
export type resetPasswordType = z.infer<typeof validateResetPassword>;

export const validateLoginUser = z.object({
  email: z
    .string({ message: "Please Provide a Email" })
    .email("Please provide valid email"),
  unencryptedPassword: z.string({ message: "Please Provide a Password" }),
});
export type LoginUserType = z.infer<typeof validateLoginUser>;

export const validateResetPasswordLink = z.object({
  token: z.string(),
  unencryptedPassword: z.string(),
});
export type resetPasswordLinkType = z.infer<typeof validateResetPasswordLink>;
