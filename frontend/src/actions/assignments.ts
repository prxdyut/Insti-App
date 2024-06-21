import { type LoaderFunctionArgs } from "react-router-dom";
import { getFiles } from "../utils/files";

export async function assignmentNewAction({
  request,
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  const title = formData.get("title") as string;
  const start = formData.get("start") as string;
  const expire = formData.get("expire") as string;
  const subject = formData.get("subject") as string;
  const description = formData.get("description") as string;
  const files = getFiles(formData);

  return { success: "yo" };
}

export async function assignmentEditAction({
  request,
  params,
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  const id = params?.id;
  const title = formData.get("title") as string;
  const start = formData.get("start") as string;
  const expire = formData.get("expire") as string;
  const subject = formData.get("subject") as string;
  const description = formData.get("description") as string;
  const files = getFiles(formData);

  return { success: "yo" };
}

export async function assignmentSubmitAction({
  request,
  params,
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  const id = params?.id;
  const description = formData.get("description") as string;
  const files = getFiles(formData);

  return { success: id + description + JSON.stringify(files) };
}

export async function assignmentSubmissionAction({
  request,
  params,
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  const submissionId = formData.get("submissionId") as string;
  const remark = formData.get("remark") as string;
  const status = formData.get("status") as string;

  return { toast: submissionId + " is marked as " + status };
}
