import { z } from "zod";

export const validateCreateUser = z.object({
  first: z.string(),
  last: z.string(),
  unencryptedPassword: z.string(),
  role: z.coerce.number().min(0).max(2),
  phone: z.string(),
  email: z.string().email(),
});
export type createUserType = z.infer<typeof validateCreateUser>;

export const validateEditUser = z.object({
  first: z.string().optional(),
  last: z.string().optional(),
  role: z.coerce.number().min(0).max(2).optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});
export type editUserType = z.infer<typeof validateEditUser>;

export const validateResetPassword = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});
export type resetPasswordType = z.infer<typeof validateResetPassword>;

export const validateLoginUser = z.object({
  id: z.string(),
  unencryptedPassword: z.string(),
});
export type LoginUserType = z.infer<typeof validateLoginUser>;