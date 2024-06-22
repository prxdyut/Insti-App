import { profileProvider } from "../providers/profile";
import { authProvider } from "../providers/auth";
import { usersProvider } from "../providers/users";
import { ACCOUNT_SLUG } from "../utils/slugs";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

export const profileHomeLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await profileProvider.load({});
  return {
    user: await authProvider.getUser(args),
    ...profileProvider.data,
  };
};

export const profileNewLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await profileProvider.load({});
  return {
    user: await authProvider.getUser(args),
    ...profileProvider.data,
  };
};

export const profileEditLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await usersProvider.load({});
  const url = new URL(args.request.url);
  const id = url.searchParams.get("userId");
  const { users } = usersProvider.data;
  const userData = users.find((_) => _.userId === id);

  if (id && userData) {
    await usersProvider.load({});
    
    return {
      user: await authProvider.getUser(args),
      userData,
      ...usersProvider.data,
    };
  } else {
    url.searchParams.set("userId", users[0].userId);
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }
};
