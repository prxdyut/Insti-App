import { BlockTitle, Button, List, ListItem, Page } from "framework7-react";
import React from "react";
import { openImagesPopup } from "../../events/imagesPopup";
import Images from "../Images";
import { useLoaderData, useNavigate } from "react-router-dom";
import DoubtsList from "../../components/Doubts/List";

export default function DoubtsHome() {
  const data = useLoaderData() as { doubts: Doubt[] };
  const navigateTo = useNavigate();

  return (
    <Page>
      <div className={`" px-4 flex justify-end mt-2 -my-5 `}>
        <Button fill className=" w-min" onClick={() => navigateTo("./new")}>
          New Doubt
        </Button>
      </div>
      {/* <BlockTitle>Doubts</BlockTitle> */}
      <DoubtsList {...data} />
    </Page>
  );
}
