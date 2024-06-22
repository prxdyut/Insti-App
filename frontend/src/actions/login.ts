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
  let username = formData.get("username") as string | null;
  let password = formData.get("password") as string | null;
  let redirectTo = formData.get("redirectTo") as string | null;

  if (!username) {
    return {
      error: "You must provide a username",
    };
  }

  if (!password) {
    return {
      error: "You must provide the password",
    };
  }

  try {
    await authProvider.signin(username, password);
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
