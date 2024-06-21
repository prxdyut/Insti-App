import { BlockTitle, Page } from "framework7-react";
import React from "react";
import FormBuilder from "../../components/Form/Builder";
import useFormHandler from "../../hooks/formHandler";
import { useLoaderData } from "react-router-dom";

export default function ResourceEdit() {
  const { file } = useLoaderData() as {
    file: _File;
  };

  const formHandler = useFormHandler();

  return (
    <Page>
      <BlockTitle>Edit Resource</BlockTitle>
      <FormBuilder
        submit="Edit Resource"
        structure={[
          {
            type: "text",
            label: "Title",
            required: true,
            name: "title",
            placeholder: "Title of Resource",
            defaultValue: file.title,
          },
          {
            type: "files",
            label: "Upload File",
            single: true,
            value: [file],
          },
        ]}
      />
    </Page>
  );
}
