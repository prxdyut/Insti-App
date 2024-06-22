import { ALERT_SLUG } from "../utils/slugs";
import { alertsProvider } from "../providers/alerts";
import { authProvider } from "../providers/auth";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

export const alertsHomeLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await alertsProvider.load({});
  return {
    user: await authProvider.getUser(args),
    ...alertsProvider.data,
  };
};

export const alertNewLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await alertsProvider.load({});

  return {
    user: await authProvider.getUser(args),
    ...alertsProvider.data,
  };
};

export const alertsSingleLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await alertsProvider.load({});
  const id = args.params.id;
  const { alerts } = alertsProvider.data;
  const alert = alerts.find((_) => _.uid === id);
  const searchParams = new URLSearchParams();

  if (alert) {
    return {
      user: await authProvider.getUser(args),
      alert,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${ALERT_SLUG}?${searchParams.toString()}`);
  }
};

export const alertsEditLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await alertsProvider.load({});
  const id = args.params.id;
  const { alerts } = alertsProvider.data;
  const alert = alerts.find((_) => _.uid === id);
  const searchParams = new URLSearchParams();

  if (alert) {
    return {
      user: await authProvider.getUser(args),
      alert,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${ALERT_SLUG}?${searchParams.toString()}`);
  }
};
