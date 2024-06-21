import { BlockTitle, List, ListInput, Page } from "framework7-react";
import React from "react";
import FormBuilder from "../../components/Form/Builder";
import useFormHandler from "../../hooks/formHandler";
import { useLoaderData, useSearchParams } from "react-router-dom";

export default function ProfileNew() {
  const formHandler = useFormHandler();

  const structure: FormBuilder[] = [
    {type: 'block', label: 'New User'},
    {
      type: "text",
      label: "First Name",
      placeholder: "",
      name: "firstName",
      required: true,
    },
    {
      type: "text",
      label: "Last Name",
      placeholder: "",
      name: "lastName",
      required: true,
    },
    {
      type: "text",
      label: "Phone Number",
      placeholder: "",
      name: "phoneNumber",
      required: true,
    },
  ];
  
  return (
    <Page>
      <FormBuilder
        submit="Create User"
        structure={structure}
      />
    </Page>
  );
}
