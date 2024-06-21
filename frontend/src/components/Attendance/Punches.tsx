import { isSameDay } from "date-fns";
import { Block, List, ListItem } from "framework7-react";
import React from "react";
import { useSearchParams } from "react-router-dom";

export default function AttendancePunches({
  attendance,
}: {
  attendance: Attendance[];
}) {
  const [searchParams] = useSearchParams();
  const selected = new Date(searchParams.get("date") as string);
  const data = attendance.find((_) => isSameDay(_.date, selected));

  return (
    <Block>
      <List dividersIos outlineIos strongIos>
        {data?.punches.length &&
          data.punches.map((punch, i) => (
            <ListItem
              title={
                i == 0
                  ? "Punch In"
                  : i == Array(data?.punches).length - 1
                  ? "Punch Out"
                  : "Punch"
              }
              after={`${punch}`}
              key={i}
            />
          ))}
      </List>
    </Block>
  );
}
