import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { assignmentsProvider } from "../providers/assignments";
import { authProvider } from "../providers/auth";
import { attendanceProvider } from "../providers/attendance";
import { ATTENDANCE_SLUG, SCHEDULE_SLUG } from "../utils/slugs";
import { usersProvider } from "../providers/users";

export const attendancesHomeLoader = async (context: LoaderFunctionArgs) => {
  const searchParams = new URL(context.request.url).searchParams;
  const date = searchParams.get("date") as string;

  if (date) {
    await attendanceProvider.load({ date });
    return {
      user: authProvider.getUser(),
      ...attendanceProvider.data,
    };
  } else {
    searchParams.set("date", new Date().toLocaleDateString());
    return redirect(`/${ATTENDANCE_SLUG}?` + searchParams.toString());
  }
};

export const attendancesNewLoader = async (context: LoaderFunctionArgs) => {
  const searchParams = new URL(context.request.url).searchParams;
  const selected = searchParams.get("selected") as string;
  await usersProvider.load({});

  if (selected) {
    return {
      user: authProvider.getUser(),
      selected: new Date(selected),
      ...usersProvider.data,
    };
  } else {
    searchParams.set("selected", new Date().toLocaleDateString());
    return redirect(`/${ATTENDANCE_SLUG}/new?` + searchParams.toString());
  }
};
