import { ALERT_SLUG } from "../utils/slugs";
import { alertsProvider } from "../providers/alerts";
import { authProvider } from "../providers/auth";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

export const alertsHomeLoader = async () => {
  await alertsProvider.load({});
  return {
    user: authProvider.getUser(),
    ...alertsProvider.data,
  };
};

export const alertsSingleLoader = async (args: LoaderFunctionArgs) => {
  await alertsProvider.load({});
  const id = args.params.id;
  const { alerts } = alertsProvider.data;
  const alert = alerts.find((_) => _.uid === id);
  const searchParams = new URLSearchParams();

  if (alert) {
    return {
      user: authProvider.getUser(),
      alert,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${ALERT_SLUG}?${searchParams.toString()}`);
  }
};

export const alertsEditLoader = async (args: LoaderFunctionArgs) => {
  await alertsProvider.load({});
  const id = args.params.id;
  const { alerts } = alertsProvider.data;
  const alert = alerts.find((_) => _.uid === id);
  const searchParams = new URLSearchParams();

  if (alert) {
    return {
      user: authProvider.getUser(),
      alert,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${ALERT_SLUG}?${searchParams.toString()}`);
  }
};
