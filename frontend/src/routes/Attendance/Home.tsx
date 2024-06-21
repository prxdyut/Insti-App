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

export default function AttendanceHome() {
  const data = useLoaderData() as { attendance: Attendance[] };

  return (
    <Page>
      {/* <BlockTitle>Attendndance</BlockTitle> */}
      <AttendanceCalendar {...data} />
      <AttendancePunches {...data} />
    </Page>
  );
}
