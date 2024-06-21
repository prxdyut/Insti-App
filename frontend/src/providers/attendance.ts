import { del, get, set, update } from "idb-keyval";
import subjects from "../utils/subjects";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  getWeek,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { getAttendanceCalendar } from "../utils/calender";

export const attendanceProvider: Provider<{ attendance: AttendanceRef[] }> = {
  data: { attendance: [] },
  initial: true,
  async load({ date }: { date: string }) {
    let data: { attendance: AttendanceRef[] } = { attendance: [] };

    if (!attendanceProvider.data.attendance.length) {
      data.attendance = getAttendanceCalendar(date);
    }else{
      data.attendance = attendanceProvider.data.attendance
    }

    attendanceProvider.initial = false;
    attendanceProvider.data = data;
  },
};
