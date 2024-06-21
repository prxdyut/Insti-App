import {
  Block,
  Button,
  List,
  ListItem,
  Page,
  Link,
  Messagebar,
  MessagebarAttachments,
  MessagebarAttachment,
  Icon,
  f7,
} from "framework7-react";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AttachmentFiles from "../../components/Attachment/Files";
import { format } from "date-fns";
import subjects from "../../utils/subjects";

export default function ScoreSingle() {
  const { score } = useLoaderData() as { score: Score };

  return (
    <Page>
      <style>
        {`
          .scoreDetails p {
            margin: 0px;
          }
          .scoreDetails hr {
            margin-block: 8px;
          }
        `}
      </style>
      <Block>
        <div className="text-xl font-semibold mb-4">{score.title}</div>
        <div className="text-xs mb-1">{format(score.date, "dd MMM, yyyy")}</div>
        <div className="text-base mb-1 capitalize">
          {subjects()[score.subject]}
        </div>
        <div className=" mb-2 text-3xl font-bold">
          {score.marks.obtained} / {score.marks.total}
        </div>
        <div className=" mb-1">Questions: </div>
        <AttachmentFiles size="big" tile files={score.questions} />
        <div className=" mt-4 mb-1">Answers: </div>
        <AttachmentFiles size="big" tile files={score.answers} />
      </Block>
    </Page>
  );
}
