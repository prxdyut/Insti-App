import { doubtsProvider } from "../providers/doubts";
import { authProvider } from "../providers/auth";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { DOUBTS_SLUG } from "../utils/slugs";

export const doubtsHome = async () => {
  await doubtsProvider.load({});

  return {
    user: authProvider.getUser(),
    ...doubtsProvider.data,
  };
};

export const doubtsSingle = async (args: LoaderFunctionArgs) => {
  await doubtsProvider.load({});
  const id = args.params.id;
  const { doubts } = doubtsProvider.data;
  const doubt = doubts.find((_) => _.uid === id);
  const searchParams = new URLSearchParams();

  if (doubt) {
    return {
      user: authProvider.getUser(),
      doubt,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${DOUBTS_SLUG}?${searchParams.toString()}`);
  }
};
