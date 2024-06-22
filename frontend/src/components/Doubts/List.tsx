import { format, parseISO } from "date-fns";
import {
  Block,
  BlockTitle,
  Button,
  Icon,
  List,
  ListItem,
  Page,
  SwipeoutActions,
  SwipeoutButton,
} from "framework7-react";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { formatTimestamp } from "../../routes/Alerts/helpers";
import { colorState, formatDays } from "../../routes/Assignments/helpers";
import subjects from "../../utils/subjects";
import { MATHS_ASSIGNMENT } from "../../utils/icons";
import { DOUBTS_SLUG } from "../../utils/slugs";
import { htmlToText } from "../../routes/Doubts/helpers";

export default function DoubtsList({ doubts }: { doubts: DoubtsRef[] }) {
  const navigateTo = useNavigate();

  return (
    <Block className=" no-padding">
      
      <List dividersIos mediaList outlineIos strongIos>
        {doubts.map(
          ({ title, respondants, subject, by, description, cover, uid }, i) => (
            <ListItem
              link={`/${DOUBTS_SLUG}/${uid}`}
              key={i}
              // swipeout
              title={String(title)}
              after={String(respondants)}
              subtitle={by?.firstName + " " + by?.lastName}
              text={String(htmlToText(String(description)))}
              onClick={() => navigateTo(`/${DOUBTS_SLUG}/${uid}`)}
            >
              {/* <SwipeoutActions left>
                <SwipeoutButton color="Pink">Expand</SwipeoutButton>
              </SwipeoutActions>
              <SwipeoutActions right>
                <SwipeoutButton color="teal">Replies</SwipeoutButton>
                <SwipeoutButton color="Lightblue">Reply</SwipeoutButton>
              </SwipeoutActions> */}
            </ListItem>
          )
        )}
      </List>
    </Block>
  );
}
