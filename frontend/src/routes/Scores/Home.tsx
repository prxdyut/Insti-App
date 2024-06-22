import { BlockTitle, Icon, List, ListItem, Page } from "framework7-react";
import React, { forwardRef, useRef } from "react";
import Images from "../Images";
import { f7 } from "framework7-react";
import { openImagesPopup } from "../../events/imagesPopup";
import { useLoaderData } from "react-router-dom";
import subjects from "../../utils/subjects";
import ScoresList from "../../components/Scores/List";
import ConditionalButton from "../../components/Admin/Button";

export default function ScoresHome() {
  const data = useLoaderData() as {
    scores: Score[];
    user: User
  };

  return (
    <Page>
      <ConditionalButton
        user={data.user}
        className="px-4 flex justify-end -mb-5 mt-2"
        label="New Score"
        navigate="./new"
      />
      {/* <BlockTitle>Tests</BlockTitle> */}

     <ScoresList {...data} />
    </Page>
  );
}
