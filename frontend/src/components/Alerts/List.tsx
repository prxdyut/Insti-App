import { format, parseISO } from "date-fns";
import {
  Block,
  BlockTitle,
  Button,
  List,
  ListItem,
  Page,
  SwipeoutActions,
  SwipeoutButton,
} from "framework7-react";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { formatTimestamp } from "../../routes/Alerts/helpers";
import { ALERT_SLUG } from "../../utils/slugs";
import { htmlToText } from "../../routes/Alerts/helpers";
import ConditionalButton from "../Admin/Button";

export default function AlertsList({
  alerts,
  user,
}: {
  alerts: Alert[];
  user: User;
}) {
  const navigateTo = useNavigate();

  return (
    <Block className=" no-padding">
      
      <List dividersIos mediaList outlineIos strongIos>
        {alerts.map(({ summary, date, title, description, uid }, i) => (
          <ListItem
            key={i}
            // swipeout
            link={`/${ALERT_SLUG}/${uid}`}
            title={summary}
            after={formatTimestamp(date)}
            subtitle={title}
            text={htmlToText(description) as string}
            onClick={() => navigateTo(`/${ALERT_SLUG}/${uid}`)}
          >
            {/* <SwipeoutActions right>
              <SwipeoutButton>Open</SwipeoutButton>
            </SwipeoutActions> */}
          </ListItem>
        ))}
      </List>
    </Block>
  );
}
