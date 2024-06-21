import { type LoaderFunctionArgs } from "react-router-dom";
import { getFiles } from "../utils/files";
import { getButton } from "../utils/button";

export async function scoresNewAction({
  request,
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  const title = formData.get("title") as string;
  const subject = formData.get("subject") as string;
  const total = formData.get("total") as string;
  const questions = getFiles(formData, "questions");
  const answers = getFiles(formData, "answers");
  const students = formData.get("students") as string;
  const obtained = formData.getAll("obtained") as string[];

  console.log(title, subject, questions, answers, students, obtained);
  return { success: "yo" };
}

export async function scoresEditAction({
  request,
  params,
}: LoaderFunctionArgs): Promise<FormActionData> {
  let formData = await request.formData();
  const id = params?.id
  const title = formData.get("title") as string;
  const subject = formData.get("subject") as string;
  const total = formData.get("total") as string;
  const questions = getFiles(formData, "questions");
  const answers = getFiles(formData, "answers");
  const students = formData.get("students") as string;
  const obtained = formData.getAll("obtained") as string[];
  
  console.log(id,title, subject, questions, answers, students, obtained);
  return { success: "yo" };
}
