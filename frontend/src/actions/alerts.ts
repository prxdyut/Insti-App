import { type LoaderFunctionArgs } from "react-router-dom";
import { getFiles } from "../utils/files";
import { getButton } from "../utils/button";
import fetchBackend from "../utils/fetchBackend";

export async function alertNewAction({
  request,
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  try {
    const res = await fetchBackend("/alerts", "POST", formData);
    console.log(res)
    return { success: "Created Alert" };
  } catch (error: any) {
    return { error };
  }
}

export async function alertEditAction({
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
