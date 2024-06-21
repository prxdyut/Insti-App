import { BlockTitle, Icon, List, ListItem, Page } from "framework7-react";
import React, { forwardRef, useRef } from "react";
import Images from "../Images";
import { f7 } from "framework7-react";
import { openImagesPopup } from "../../events/imagesPopup";
import { useLoaderData } from "react-router-dom";
import subjects from "../../utils/subjects";
import ScoresList from "../../components/Scores/List";

export default function ScoresHome() {
  const data = useLoaderData() as {
    scores: Score[];
  };

  return (
    <Page>
      {/* <BlockTitle>Tests</BlockTitle> */}

     <ScoresList {...data} />
    </Page>
  );
}
