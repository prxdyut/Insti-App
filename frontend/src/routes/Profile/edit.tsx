import { BlockTitle, List, ListInput, Page } from "framework7-react";
import React from "react";
import FormBuilder from "../../components/Form/Builder";
import useFormHandler from "../../hooks/formHandler";
import { useLoaderData, useSearchParams } from "react-router-dom";
 

export default function ProfileEdit() {
  const formHandler = useFormHandler();

  const { userData } = useLoaderData() as {
    userData: User;
    users: User[];
  };

  const structure: FormBuilder[] = [
    {type: 'block', label: 'Edit User'},
    {
      type: "text",
      label: "First Name",
      placeholder: "",
      defaultValue: userData.firstName,
      name: "firstName",
      required: true,
    },
    {
      type: "text",
      label: "Last Name",
      placeholder: "",
      defaultValue: userData.lastName,
      name: "lastName",
      required: true,
    },
    {
      type: "text",
      label: "Phone Number",
      placeholder: "",
      defaultValue: userData.phoneNumber,
      name: "phoneNumber",
      required: true,
    },
  ];
  console.log(structure);
  return (
    <Page>
      <BlockTitle>Select User</BlockTitle>
      <ProfileSelect />
      <FormBuilder
        submit="Edit User"
        structure={structure}
        key={userData.userId}
      />
    </Page>
  );
}

function ProfileSelect() {
  const { users, userData } = useLoaderData() as {
    userData: User;
    users: User[];
  };

  const [searchParams, setSearchParams] = useSearchParams();

  return (
      <List className=" capitalize">
        <ListInput
          label={"User"}
          type="select"
          onChange={(_) => setSearchParams({ userId: _.target.value })}
          value={searchParams.get("userId") || users[0].userId}
        >
          {users.map((user) => (
            <option className=" capitalize" value={user.userId}>
              {`${user.firstName} ${user.lastName} - ${user.userId}`}
            </option>
          ))}
        </ListInput>
      </List>
  );
}
