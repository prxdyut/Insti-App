import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authProvider } from "../providers/auth";

export const authLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  return {
    user: await authProvider.getUser(args),
  };
};
