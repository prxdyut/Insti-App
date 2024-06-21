import { f7 } from "framework7-react";

export function openImagesPopup() {
  // @ts-ignore
  f7.emit("calendarSchedule");
}

export function imagesPopupListener(cb: any) {
  // @ts-ignore
  f7.on("calendarSchedule", cb);
}
