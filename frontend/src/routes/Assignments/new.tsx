import { Page } from "framework7-react";
import React from "react";
import FormBuilder from "../../components/Form/Builder";
import useFormHandler from "../../hooks/formHandler";

export default function AssignmentNew() {
  const formHandler = useFormHandler();
  
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
          },
          {
            type: "subject",
            required: true,
            placeholder: "Subject of Assignment",
          },
          { type: "date", label: "Start", required: true, name: "start" },
          { type: "date", label: "Expire", required: true, name: "expire" },
          {
            type: "editor",
            required: true,
            name: "description",
            placeholder: "Description of Assignment",
          },
          {
            type: "files",
            label: "Upload Files",
          },
        ]}
      />
    </Page>
  );
}
