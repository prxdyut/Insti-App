import { allScoresProvider, scoresProvider } from "../providers/scores";
import { authProvider } from "../providers/auth";
import { SCORES_SLUG } from "../utils/slugs";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { usersProvider } from "../providers/users";

export const scoresHomeLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await scoresProvider.load({});
  return {
    user: await authProvider.getUser(args),
    ...scoresProvider.data,
  };
};

export const ScoresSingleLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await scoresProvider.load({});
  const id = args.params.id;
  const { scores } = scoresProvider.data;
  const score = scores.find((_) => _.uid === id);
  const searchParams = new URLSearchParams();

  if (score) {
    return {
      user: await authProvider.getUser(args),
      score,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${SCORES_SLUG}?${searchParams.toString()}`);
  }
};

export const scoresNewLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await usersProvider.load({});
  return {
    user: await authProvider.getUser(args),
    ...usersProvider.data,
  };
};

export const scoresEditLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await scoresProvider.load({});
  const id = args.params.id;

  const searchParams = new URLSearchParams();
  await usersProvider.load({});
  await allScoresProvider.load({});
  const allScore = allScoresProvider.data.scores.find((_) => _.uid ==id);

  if (id && allScore)
    return {
      user: await authProvider.getUser(args),
      allScore,
      ...usersProvider.data,
    };
  else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${SCORES_SLUG}?${searchParams.toString()}`);
  }
};
