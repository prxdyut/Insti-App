import { format, parseISO } from "date-fns";
import {
  Block,
  BlockTitle,
  List,
  ListItem,
  Page,
  SwipeoutActions,
  SwipeoutButton,
} from "framework7-react";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { formatTimestamp } from "../../routes/Alerts/helpers";
import subjects from "../../utils/subjects";
import { DOUBTS_SLUG, SCORES_SLUG } from "../../utils/slugs";

export default function ScoresList({ scores }: { scores: Score[] }) {
  const navigateTo = useNavigate()

  return (
    <Block className=" no-padding">
      <List dividersIos outlineIos strongIos>
        {scores.map(({ subject, title, marks, date, uid }, i) => (
          <ListItem
          className=" capitalize"
            key={i}
            link={`/${SCORES_SLUG}/${uid}`}
            header={subjects()[subject]}
            title={title}
            after={`${marks.obtained} / ${marks.total}`}
            footer={`${date.toDateString()}`}
            onClick={()=> navigateTo(`/${SCORES_SLUG}/${uid}`)}
          />
        ))}
      </List>
    </Block>
  );
}
