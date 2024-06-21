import { BlockTitle, Page } from "framework7-react";
import React from "react";
import FormBuilder from "../../components/Form/Builder";
import useFormHandler from "../../hooks/formHandler";
import { useLoaderData } from "react-router-dom";

export default function DoubtsNew() {
  const formHandler = useFormHandler();

  return (
    <Page>
      <BlockTitle>New Doubt</BlockTitle>
      <FormBuilder
        submit="Create Score"
        structure={[
          {
            type: "text",
            label: "Title",
            required: true,
            name: "title",
            placeholder: "Title of your Doubt",
          },
          {
            type: "textarea",
            label: "Description",
            required: true,
            name: "description",
            placeholder: "Describe your Doubt",
          },
          {type: 'subject', required: true},
          {
            type: "files",
            label: "Upload Questions",
          },
        ]}
      />
    </Page>
  );
}
