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
  BlockTitle,
} from "framework7-react";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AttachmentFiles from "../../components/Attachment/Files";
import { format } from "date-fns";
import subjects from "../../utils/subjects";
import ConditionalButton from "../../components/Admin/Button";

export default function ScoreSingle() {
  const { score, allScore, ...data } = useLoaderData() as {
    score: Score;
    allScore: AllScore;
    user: User;
  };
  console.log("allScore", allScore);
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
        <div className=" flex">
          <ConditionalButton
            {...data}
            className="mb-4"
            label="Edit"
            navigate="./edit"
            buttonProps={{ small: true }}
          />
        </div>
        <div className="text-xl font-semibold mb-4">{allScore.title}</div>
        <div className="text-xs mb-1">
          {format(allScore.date, "dd MMM, yyyy")}
        </div>
        <div className="text-base mb-1 capitalize">
          {subjects()[allScore.subject]}
        </div>
        <div className=" mb-2 text-3xl font-bold">{allScore.total}</div>
        <div className=" mb-1">Questions: </div>
        <AttachmentFiles size="big" files={allScore.questions} />
        <div className=" mt-4 mb-1">Answers: </div>
        <AttachmentFiles size="big" files={allScore.answers} />
      </Block>
      <BlockTitle>Scores</BlockTitle>
      <List>
        {allScore.users.map((user, i) => (
          <ListItem title={`${user.firstName} ${user.lastName}`}>
            {allScore.obtained[i]}
          </ListItem>
        ))}
      </List>
    </Page>
  );
}
