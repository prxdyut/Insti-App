import {
  redirect,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router-dom";
import { authProvider } from "../providers/auth";
 

export async function loginAction(
  args: LoaderFunctionArgs
): Promise<FormActionData> {
  const request = args.request;
  let formData = await request.formData();
  let email = formData.get("email") as string | null;
  let password = formData.get("password") as string | null;
  let redirectTo = formData.get("redirectTo") as string | null;

  if (!email) {
    return {
      error: "You must provide a email",
    };
  }

  if (!password) {
    return {
      error: "You must provide the password",
    };
  }

  try {
    await authProvider.signin(email, password);
  } catch (error) {
    return {
      error: error as string,
    };
  }

  const user = await authProvider.getUser(args);
  return {
    success: `Welcome ${user.firstName} ${user.lastName}`,
    redirect: redirectTo as string,
  };
}
