import { f7 } from "framework7-react";

export function changeCalendarScheduleEdit(value: Date[]) {
  // @ts-ignore
  f7.emit("calendarScheduleEdit", value);
}

export function onCalendarScheduleEdit(cb: any) {
  // @ts-ignore
  f7.on("calendarScheduleEdit", cb);
}
