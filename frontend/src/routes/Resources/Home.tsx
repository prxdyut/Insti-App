import { ResourcesList } from "../../components/Resources/List";
import {
  Block,
  BlockTitle,
  Icon,
  List,
  ListItem,
  Page,
} from "framework7-react";
import React from "react";
import { useLoaderData } from "react-router-dom";
import ConditionalButton from "../../components/Admin/Button";

export default function ResourcesHome() {
  const data = useLoaderData() as {
    files: _File[];
    user: User
  };

  return (
    <Page>
      <ConditionalButton
        user={data.user}
        className="px-4 flex justify-end mt-2 -mb-5"
        label="New Resource"
        navigate="./new"
      />
      {/* <BlockTitle>Resources</BlockTitle> */}
      <ResourcesList {...data} />
    </Page>
  );
}
