import { BlockTitle, Page } from "framework7-react";
import React from "react";
import FormBuilder from "../../components/Form/Builder";
import useFormHandler from "../../hooks/formHandler";
import { useLoaderData } from "react-router-dom";

export default function AlertNew() {
  const formHandler = useFormHandler();

  return (
    <Page>
      <BlockTitle>New Alert</BlockTitle>
      <FormBuilder
        submit="Create Alert"
        structure={[
          {
            type: "text",
            label: "Title",
            required: true,
            name: "title",
            placeholder: "Title of Alert",
          },
          {
            type: "text",
            label: "Subtitle",
            required: true,
            name: "subtitle",
            placeholder: "Subtitle of Alert",
          },
          {
            type: "editor",
            required: true,
            name: "description",
            placeholder: "Description of Alert",
          },
          {
            type: "files",
            label: "Upload Files",
          },
          {
            type: "button",
            labelLabel: "Label for Button",
            linkLabel: "Link for Button",
          },
        ]}
      />
    </Page>
  );
}
