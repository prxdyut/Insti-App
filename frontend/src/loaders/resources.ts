import { resourcesProvider } from "../providers/resources";
import { authProvider } from "../providers/auth";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { RESOURCES_SLUG } from "../utils/slugs";

export const resourcesHomeLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await resourcesProvider.load({});

  return {
    user: await authProvider.getUser(args),
    ...resourcesProvider.data,
  };
};

export const resourcesNewLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await resourcesProvider.load({});

  return {
    user: await authProvider.getUser(args),
    ...resourcesProvider.data,
  };
};

export const resourceEditLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await resourcesProvider.load({});
  const id = args.params.id;
  const { files } = resourcesProvider.data;
  const file = files.find((_) => _._id === id);
  const searchParams = new URLSearchParams();
console.log(files)
  if (file) {
    return {
      user: await authProvider.getUser(args),
      file,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${RESOURCES_SLUG}?${searchParams.toString()}`);
  }
};