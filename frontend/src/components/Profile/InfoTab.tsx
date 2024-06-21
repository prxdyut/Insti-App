import {
  IconButton,
  Popover,
  Typography,
  Button as MuiButton,
} from "@mui/material";
import {
  Block,
  BlockTitle,
  Button,
  Icon,
  Link,
  List,
  ListInput,
  ListItem,
  Page,
  Tab,
  Tabs,
  Toolbar,
  f7,
} from "framework7-react";
import { ListInputProps } from "framework7-react/components/list-input";
import React from "react";
import { useLoaderData } from "react-router-dom";

export function ProfileTab({ info }: { info: ProfileInfo }) {
  const inputs: Partial<ListInputProps>[] = [
    {
      id: "uid",
      label: "UID",
      type: "text",
      value: info["uid"],
      readonly: true,
      className: "col-span-6",
    },
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      value: info["firstName"],
      readonly: true,
      className: "col-span-3",
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      value: info["lastName"],
      readonly: true,
      className: "col-span-3",
    },
    {
      id: "class",
      label: "Class",
      type: "text",
      value: info["class"],
      readonly: true,
      className: "col-span-2",
    },
    {
      id: "division",
      label: "Division",
      type: "text",
      value: info["division"],
      readonly: true,
      className: "col-span-2",
    },
    {
      id: "rollNo",
      label: "Roll No.",
      type: "text",
      value: info["rollNo"],
      readonly: true,
      className: "col-span-2",
    },
    {
      id: "eMail",
      label: "E-mail",
      type: "email",
      value: info["eMail"],
      readonly: true,
      className: "col-span-6",
    },
    {
      id: "phoneNo",
      label: "Phone No.",
      type: "text",
      value: info["phoneNo"],
      readonly: true,
      className: "col-span-6",
    },
  ];
  return (
    <Tab id="tab-1" tabActive>
      <Block className=" no-padding grid grid-cols-6">
        {inputs.map((input, i) => (
          <List
            key={i}
            style={{
              margin: 0,
            }}
            className={input.className}
          >
            <ListInput {...input} />
          </List>
        ))}
      </Block>
    </Tab>
  );
}
