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