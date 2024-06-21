import { f7 } from "framework7-react";

export function modifyDoubtReply(reply: DoubtReplyReference) {
  // @ts-ignore
  f7.emit("modifyDoubtReply", reply);
}

export function modifyDoubtReplyListener(cb: (reply: DoubtReplyReference) => void) {
  // @ts-ignore
  f7.on("modifyDoubtReply", cb);
}
