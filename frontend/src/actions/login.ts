import {
  redirect,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router-dom";
import { authProvider } from "../providers/auth";

export async function loginAction({
  request,
}: LoaderFunctionArgs): Promise<ActionRes<UserRef>> {

  let formData = await request.formData();
  let username = formData.get("username") as string | null;
  let password = formData.get("password") as string | null;
  let redirectTo = formData.get("redirectTo") as string | null;

  if (!username) {
    return {
      message: "You must provide a username to log in",
      error: true,
    };
  }

  if (!password) {
    return {
      message: "You must provide the password to log in",
      error: true,
    };
  }

  try {
    await authProvider.signin(username, password);
  } catch (error) {
    return {
      message: error as string,
      error: true,
    };
  }

  const user = await authProvider.getUser();
  return {
    error: false,
    res: user,
    redirect: redirectTo as string
  };
}
