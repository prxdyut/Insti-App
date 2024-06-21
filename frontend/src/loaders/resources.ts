import { resourcesProvider } from "../providers/resources";
import { authProvider } from "../providers/auth";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { RESOURCES_SLUG } from "../utils/slugs";

export const resourcesHomeLoader = async () => {
  await resourcesProvider.load({});

  return {
    user: authProvider.getUser(),
    ...resourcesProvider.data,
  };
};

export const resourceEditLoader = async (args: LoaderFunctionArgs) => {
  await resourcesProvider.load({});
  const id = args.params.id;
  const { files } = resourcesProvider.data;
  const file = files.find((_) => _._id === id);
  const searchParams = new URLSearchParams();
console.log(files)
  if (file) {
    return {
      user: authProvider.getUser(),
      file,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${RESOURCES_SLUG}?${searchParams.toString()}`);
  }
};