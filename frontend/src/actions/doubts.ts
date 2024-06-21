import { type LoaderFunctionArgs } from "react-router-dom";
import { getFiles } from "../utils/files";
import { getButton } from "../utils/button";

export async function doubtNewAction({
  request,
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const subject = formData.get("subject") as string;
  const files = getFiles(formData);

  return { success: "yo" };
}

export async function doubtReplyAction({
  request,
  params,
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  const id = params?.id;
  const description = formData.get("description") as string;
  const replyTo = formData.get("replyTo") as string;
  const files = getFiles(formData);
  console.log(id, replyTo, description, files)

  // const text = messageText.replace(/\n/g, "<br>").trim();
  //   const messagesToSend = [];
  //   attachments.forEach((attachment) => {
  //     messagesToSend.push({
  //       image: attachment,
  //     });
  //   });
  //   if (text.length) {
  //     messagesToSend.push({
  //       text,
  //     });
  //   }
  //   if (messagesToSend.length === 0) {
  //     return;
  //   }

  return { toast: "Added reply" };
}
