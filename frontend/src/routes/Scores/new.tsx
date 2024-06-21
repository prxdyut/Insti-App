import { BlockTitle, Page } from "framework7-react";
import React from "react";
import FormBuilder from "../../components/Form/Builder";
import useFormHandler from "../../hooks/formHandler";
import { useLoaderData } from "react-router-dom";

export default function ScoresNew() {
  const { users } = useLoaderData() as { users: User[] };

  const formHandler = useFormHandler();

  return (
    <Page>
      <BlockTitle>New Scores</BlockTitle>
      <FormBuilder
        submit="Create Score"
        structure={[
          {
            type: "text",
            label: "Title",
            required: true,
            name: "title",
            placeholder: "Title",
          },
          {
            type: "subject",
            label: "Subject",
            required: true,
          },
          {
            type: "number",
            label: "Total",
            required: true,
            name: "Total",
            placeholder: "Total",
          },
          {
            type: "files",
            name: "questions",
            label: "Upload Questions",
          },
          {
            type: "files",
            name: "answers",
            label: "Upload Answers",
          },
          {
            type: "hidden",
            name: "students",
            value: users.map((u) => u.userId).join(","),
          },
          { type: "block", label: "Students" },
          ...users.map(
            (user): FormBuilder => ({
              type: "number",
              label: `${user.firstName} ${user.lastName} - ${user.userId}`,
              required: true,
              name: "obtained",
              placeholder: "Obtained",
            })
          ),
        ]}
      />
    </Page>
  );
}
