import React, { useRef, useEffect } from "react";
import {
  Navbar,
  Page,
  Block,
  BlockTitle,
  List,
  ListItem,
  ListInput,
  f7,
} from "framework7-react";
import ScheduleCalendar from "../../components/Schedule/Calendar";
import { useLoaderData } from "react-router-dom";
import subjects from "../../utils/subjects";
import { convertTo12HourFormat } from "../../utils/time";

export default function ScheduleHome() {
  const data = useLoaderData() as {
    schedule: Schedule[];
  };

  return (
    <Page>
      {/* <BlockTitle>Schedule</BlockTitle> */}
      <ScheduleCalendar />
      <List dividersIos mediaList outlineIos strongIos>
        {data.schedule.map((_, i) => (
          <ListItem
            key={i}
            className=" capitalize"
            title={subjects()[_.subject]}
            after={`${_.by?.firstName} ${_.by?.lastName}`}
            subtitle={`${convertTo12HourFormat(
              _.time.from
            )} to ${convertTo12HourFormat(_.time.to)}`}
          />
        ))}
      </List>
    </Page>
  );
}
