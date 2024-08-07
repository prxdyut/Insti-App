import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authProvider } from "../providers/auth";
import { performanceProvider } from "../providers/performance";

export const performanceHome = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await performanceProvider.load({});

  return {
    user: await authProvider.getUser(args),
    ...performanceProvider.data,
  };
};
