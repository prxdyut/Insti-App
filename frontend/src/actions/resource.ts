import { type LoaderFunctionArgs } from "react-router-dom";
import { getFiles } from "../utils/files";
import { getButton } from "../utils/button";

export async function resourceNewAction({
  request,
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  const title = formData.get("title") as string;
  const file = getFiles(formData)[0];
console.log(title, file)
  return { success: "yo" };
}

export async function resourceEditAction({
  request,
  params
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  const id = params?.id;
  const title = formData.get("title") as string;
  const file = getFiles(formData)[0];
console.log(title, file)
  return { success: "yo" };
}
