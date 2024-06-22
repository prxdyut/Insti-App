import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  getMonth,
  getWeek,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import {
  Block,
  BlockTitle,
  Button,
  Icon,
  Link,
  List,
  ListInput,
  Page,
} from "framework7-react";
import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import { getDetailedCalendar } from "../../utils/calender";
import AttendanceCalendar from "../../components/Attendance/Calendar";
import AttendancePunches from "../../components/Attendance/Punches";
import { useLoaderData } from "react-router-dom";
import ConditionalButton from "../../components/Admin/Button";

export default function AttendanceHome() {
  const data = useLoaderData() as { attendance: Attendance[]; user: User };

  return (
    <Page>
      <ConditionalButton
        user={data.user}
        className="px-4 flex justify-end mt-2 -mb-5"
        label="New Attendance"
        navigate="./new"
      />
      {/* <BlockTitle>Attendndance</BlockTitle> */}
      <AttendanceCalendar {...data} />
      <AttendancePunches {...data} />
    </Page>
  );
}
