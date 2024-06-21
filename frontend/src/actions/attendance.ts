import { type LoaderFunctionArgs } from "react-router-dom";
import { getFiles } from "../utils/files";
import { getButton } from "../utils/button";

export async function attendanceNewAction({
  request,
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  const date = formData.get("date") as string;
  const student = formData.get("student") as string;
  const time = formData.get("time") as string;
  console.log(date, student, time);
  
  return { success: "yo" };
}

export async function attendanceEditAction({
  request,
  params,
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  const id = params?.id;
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const description = formData.get("description") as string;
  const files = getFiles(formData);
  const button = getButton(formData);

  return { success: "yo" };
}
