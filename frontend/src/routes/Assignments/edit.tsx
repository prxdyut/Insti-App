import { Page } from "framework7-react";
import React from "react";
import FormBuilder from "../../components/Form/Builder";
import useFormHandler from "../../hooks/formHandler";
import { useLoaderData } from "react-router-dom";
import { format } from "date-fns";

export default function AssignmentEdit() {
  const formHandler = useFormHandler();
  const { assignment } = useLoaderData() as { assignment: Assignment };
  return (
    <Page>
      <FormBuilder
        submit="Create Assignment"
        structure={[
          {
            type: "text",
            label: "Title",
            required: true,
            name: "title",
            placeholder: "Title of Assignment",
            defaultValue: assignment.title,
          },
          {
            type: "subject",
            required: true,
            placeholder: "Subject of Assignment",
            value: assignment.subject
          },
          {
            type: "date",
            label: "Start",
            required: true,
            name: "start",
            defaultValue: format(assignment.date.start, 'yyyy-MM-dd'),
          },
          {
            type: "date",
            label: "Expire",
            required: true,
            name: "expire",
            defaultValue: format(assignment.date.end, 'yyyy-MM-dd'),
          },
          {
            type: "editor",
            required: true,
            name: "description",
            placeholder: "Description of Assignment",
            value: assignment.description
          },
          {
            type: "files",
            label: "Upload Files",
            value: assignment.files
          },
        ]}
      />
    </Page>
  );
}
