import { BlockTitle, Page } from "framework7-react";
import React from "react";
import FormBuilder from "../../components/Form/Builder";
import useFormHandler from "../../hooks/formHandler";
import { useLoaderData } from "react-router-dom";

export default function AlertEdit() {
  const formHandler = useFormHandler();
  const { alert } = useLoaderData() as { alert: Alert };

  return (
    <Page>
      <BlockTitle>Edit Alert</BlockTitle>
      <FormBuilder
        submit="Edit Alert"
        structure={[
          {
            type: "text",
            label: "Title",
            required: true,
            name: "title",
            placeholder: "Title of Alert",
            defaultValue: alert.title,
          },
          {
            type: "text",
            label: "Subtitle",
            required: true,
            name: "subtitle",
            placeholder: "Subtitle of Alert",
            defaultValue: alert.summary,
          },
          {
            type: "editor",
            required: true,
            name: "description",
            placeholder: "Description of Alert",
            value: alert.description,
          },
          {
            type: "files",
            label: "Upload Files",
            value: alert.files || [],
          },
          {
            type: "button",
            labelLabel: "Label for Button",
            linkLabel: "Link for Button",
            linkValue: alert.button?.link,
            labelValue: alert.button?.label,
          },
        ]}
      />
    </Page>
  );
}
