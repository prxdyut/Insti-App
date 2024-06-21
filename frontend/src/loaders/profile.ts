import { profileProvider } from "../providers/profile";
import { authProvider } from "../providers/auth";
import { usersProvider } from "../providers/users";
import { ACCOUNT_SLUG } from "../utils/slugs";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

export const profileHomeLoader = async () => {
  await profileProvider.load({});
  return {
    user: authProvider.getUser(),
    ...profileProvider.data,
  };
};

export const profileEditLoader = async (args: LoaderFunctionArgs) => {
  await usersProvider.load({});
  const url = new URL(args.request.url);
  const id = url.searchParams.get("userId");
  const { users } = usersProvider.data;
  const userData = users.find((_) => _.userId === id);

  if (id && userData) {
    await usersProvider.load({});
    
    return {
      user: authProvider.getUser(),
      userData,
      ...usersProvider.data,
    };
  } else {
    url.searchParams.set("userId", users[0].userId);
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }
};
