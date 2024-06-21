import { f7 } from "framework7-react";

export function setPerformanceSubject(value: string) {
  // @ts-ignore
  f7.emit("openImagesPopup", value);
}

export function getPerformanceSubject(cb: any) {
  // @ts-ignore
  f7.on("openImagesPopup", cb);
}
