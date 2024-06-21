import { allScoresProvider, scoresProvider } from "../providers/scores";
import { authProvider } from "../providers/auth";
import { SCORES_SLUG } from "../utils/slugs";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { usersProvider } from "../providers/users";

export const scoresHomeLoader = async () => {
  await scoresProvider.load({});
  return {
    user: authProvider.getUser(),
    ...scoresProvider.data,
  };
};

export const ScoresSingleLoader = async (args: LoaderFunctionArgs) => {
  await scoresProvider.load({});
  const id = args.params.id;
  const { scores } = scoresProvider.data;
  const score = scores.find((_) => _.uid === id);
  const searchParams = new URLSearchParams();

  if (score) {
    return {
      user: authProvider.getUser(),
      score,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${SCORES_SLUG}?${searchParams.toString()}`);
  }
};

export const scoresNewLoader = async () => {
  await usersProvider.load({});
  return {
    user: authProvider.getUser(),
    ...usersProvider.data,
  };
};

export const scoresEditLoader = async (args: LoaderFunctionArgs) => {
  await scoresProvider.load({});
  const id = args.params.id;

  const searchParams = new URLSearchParams();
  await usersProvider.load({});
  await allScoresProvider.load({});
  const allScore = allScoresProvider.data.scores.find((_) => _.uid ==id);

  if (id && allScore)
    return {
      user: authProvider.getUser(),
      allScore,
      ...usersProvider.data,
    };
  else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${SCORES_SLUG}?${searchParams.toString()}`);
  }
};
