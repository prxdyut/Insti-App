import { doubtsProvider } from "../providers/doubts";
import { authProvider } from "../providers/auth";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { DOUBTS_SLUG } from "../utils/slugs";

export const doubtsHomeLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await doubtsProvider.load({});

  return {
    user: await authProvider.getUser(args),
    ...doubtsProvider.data,
  };
};
export const doubtsNewLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await doubtsProvider.load({});

  return {
    user: await authProvider.getUser(args),
    ...doubtsProvider.data,
  };
};

export const doubtsSingleLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await doubtsProvider.load({});
  const id = args.params.id;
  const { doubts } = doubtsProvider.data;
  const doubt = doubts.find((_) => _.uid === id);
  const searchParams = new URLSearchParams();

  if (doubt) {
    return {
      user: await authProvider.getUser(args),
      doubt,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${DOUBTS_SLUG}?${searchParams.toString()}`);
  }
};
