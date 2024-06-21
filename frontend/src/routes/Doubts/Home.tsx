import { BlockTitle, List, ListItem, Page } from "framework7-react";
import React from "react";
import { openImagesPopup } from "../../events/imagesPopup";
import Images from "../Images";
import { useLoaderData } from "react-router-dom";
import DoubtsList from "../../components/Doubts/List";

export default function DoubtsHome() {
  const data = useLoaderData() as { doubts: Doubt[] };

  return (
    <Page>
      {/* <BlockTitle>Doubts</BlockTitle> */}
      <DoubtsList {...data} />
    </Page>
  );
}
