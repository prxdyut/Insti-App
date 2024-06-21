import { scheduleProvider } from "../providers/schedule";
import { authProvider } from "../providers/auth";
import { SCHEDULE_SLUG } from "../utils/slugs";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { eachDayOfInterval, isSameDay } from "date-fns";

const getSchedule = (date: string, schedule: Schedule[]) =>
  schedule.filter((_) => isSameDay(_.date, date));

export const scheduleHome = async (context: LoaderFunctionArgs) => {
  const searchParams = new URL(context.request.url).searchParams;
  const date = searchParams.get("date") as string;

  if (date) {
    await scheduleProvider.load({ date });

    return {
      user: authProvider.getUser(),
      schedule: getSchedule(date, scheduleProvider.data.schedule),
    };
  } else {
    searchParams.set("date", new Date().toLocaleDateString());
    return redirect(`/${SCHEDULE_SLUG}?` + searchParams.toString());
  }
};

export const scheduleNewLoader = async (context: LoaderFunctionArgs) => {
  const searchParams = new URL(context.request.url).searchParams;
  const selected = searchParams.get("selected") as string;

  if (selected) {
    return {
      user: authProvider.getUser(),
      selected: selected.split(",").map((_) => new Date(_)),
    };
  } else {
    searchParams.set("selected", new Date().toLocaleDateString());
    return redirect(`/${SCHEDULE_SLUG}/new?` + searchParams.toString());
  }
};

export const scheduleEditLoader = async (context: LoaderFunctionArgs) => {
  const searchParams = new URL(context.request.url).searchParams;
  const url = context.request.url;
  const selectedString = searchParams.get("selected") as string;

  if (selectedString) {
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
      user: authProvider.getUser(),
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
