import { scheduleProvider } from "../providers/schedule";
import { authProvider } from "../providers/auth";
import { SCHEDULE_SLUG } from "../utils/slugs";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { eachDayOfInterval, isSameDay } from "date-fns";

const getSchedule = (date: string, schedule: Schedule[]) =>
  schedule.filter((_) => isSameDay(_.date, date));

export const scheduleHome = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  const searchParams = new URL(args.request.url).searchParams;
  const date = searchParams.get("date") as string;

  if (date) {
    await scheduleProvider.load({ date });

    return {
      user: await authProvider.getUser(args),
      schedule: getSchedule(date, scheduleProvider.data.schedule),
    };
  } else {
    searchParams.set("date", new Date().toLocaleDateString());
    return redirect(`/${SCHEDULE_SLUG}?` + searchParams.toString());
  }
};

export const scheduleNewLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  const searchParams = new URL(args.request.url).searchParams;
  const selected = searchParams.get("selected") as string;

  if (selected) {
    return {
      user: await authProvider.getUser(args),
      selected: selected.split(",").map((_) => new Date(_)),
    };
  } else {
    searchParams.set("selected", new Date().toLocaleDateString());
    return redirect(`/${SCHEDULE_SLUG}/new?` + searchParams.toString());
  }
};

export const scheduleEditLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  const searchParams = new URL(args.request.url).searchParams;
  const url = args.request.url;
  const selectedString = searchParams.get("selected") as string;

  if (selectedString) {
    console.log("selectedString", selectedString)
    const selected = selectedString.split(",").map((_) => new Date(_));
    await scheduleProvider.load({ dates: selected });

    const allDatesSelected =
      selected.length == 2
        ? eachDayOfInterval({
            start: selected[0],
            end: selected[1],
          })
        : selected;

    return {
      user: await authProvider.getUser(args),
      schedule: allDatesSelected.map((date) =>
        getSchedule(date.toISOString(), scheduleProvider.data.schedule)
      ),
      selected,
    };
  } else {
    searchParams.set("selected", new Date().toLocaleDateString());
    return redirect(url + "?" + searchParams.toString());
  }
};
