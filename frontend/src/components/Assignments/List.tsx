import { format, parseISO } from "date-fns";
import {
  Block,
  BlockTitle,
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
import { ASSIGNMENT_SLUG } from "../../utils/slugs";
import ConditionalButton from "../Admin/Button";

export default function AssignmentsList({
  user,
  assignments,
  submissions,
}: {
  user: User;
  assignments: AssignmentRef[];
  submissions: Submission[];
}) {
  const navigateTo = useNavigate();

  return (
    <Block className=" no-padding">
      
      <List dividersIos mediaList outlineIos strongIos>
        {assignments.map(({ subject, title, by, date, uid }, i) => {
          const current_submissions = submissions.filter(
            (_) => _.assignmentId == uid
          );
          return (
            <ListItem
              key={i}
              link={`/${ASSIGNMENT_SLUG}/${uid}`}
              header={subjects()[Number(subject)]}
              title={String(title).replace("Assignment", "")}
              footer={`${by?.firstName} ${by?.lastName}`}
              after={formatDays(date as Assignment["date"])}
              className={`${colorState(
                date as Assignment["date"],
                current_submissions as Submission[]
              )}`}
              onClick={() => navigateTo(`/${ASSIGNMENT_SLUG}/${uid}`)}
            >
              <Icon slot="media" material={MATHS_ASSIGNMENT} />
            </ListItem>
          );
        })}
      </List>
    </Block>
  );
}
