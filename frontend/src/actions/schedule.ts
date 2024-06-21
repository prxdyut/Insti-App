import { type LoaderFunctionArgs } from "react-router-dom";
import { getFiles } from "../utils/files";
import { getButton } from "../utils/button";
import { format } from "date-fns";

export async function scheduleNewAction({
  request,
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  const date = formData.get("date") as string;
  const end = formData.get("end") as string;
  const subject = formData.get("subject") as string;

  return { toast: 'Schedule Set for ' + format(new Date(date), 'dd MMM, yyyy') };
}

export async function scheduleEditAction({
  request,
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  const uid = formData.get("uid") as string;
  const date = formData.get("date") as string;
  const end = formData.get("end") as string;
  const subject = formData.get("subject") as string;

  return { toast: uid + ' Schedule Set for ' + format(new Date(date), 'dd MMM, yyyy') };
}