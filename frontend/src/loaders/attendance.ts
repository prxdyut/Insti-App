import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { assignmentsProvider } from "../providers/assignments";
import { authProvider } from "../providers/auth";
import { attendanceProvider } from "../providers/attendance";
import { ATTENDANCE_SLUG, SCHEDULE_SLUG } from "../utils/slugs";
import { usersProvider } from "../providers/users";

export const attendancesHomeLoader = async (args: LoaderFunctionArgs) => {
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
    await attendanceProvider.load({ date });
    return {
      user: await authProvider.getUser(args),
      ...attendanceProvider.data,
    };
  } else {
    searchParams.set("date", new Date().toLocaleDateString());
    return redirect(`/${ATTENDANCE_SLUG}?` + searchParams.toString());
  }
};

export const attendancesNewLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  const searchParams = new URL(args.request.url).searchParams;
  const selected = searchParams.get("selected") as string;
  await usersProvider.load({});

  if (selected) {
    return {
      user: await authProvider.getUser(args),
      selected: new Date(selected),
      ...usersProvider.data,
    };
  } else {
    searchParams.set("selected", new Date().toLocaleDateString());
    return redirect(`/${ATTENDANCE_SLUG}/new?` + searchParams.toString());
  }
};
