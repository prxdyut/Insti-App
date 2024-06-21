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

export default function ResourcesHome() {
  const data = useLoaderData() as {
    files: _File[];
  };

  return (
    <Page>
      {/* <BlockTitle>Resources</BlockTitle> */}
      <ResourcesList {...data} />
    </Page>
  );
}
