import { BlockTitle, Page } from "framework7-react";
import React from "react";
import FormBuilder from "../../components/Form/Builder";
import useFormHandler from "../../hooks/formHandler";
import { useLoaderData } from "react-router-dom";

export default function ResourceNew() {
  const formHandler = useFormHandler();

  return (
    <Page>
      <BlockTitle>New Resource</BlockTitle>
      <FormBuilder
        submit="Create Resource"
        structure={[
          {
            type: "text",
            label: "Title",
            required: true,
            name: "title",
            placeholder: "Title of Resource",
          },
          {
            type: "files",
            label: "Upload File",
            single: true,
          },
        ]}
      />
    </Page>
  );
}
