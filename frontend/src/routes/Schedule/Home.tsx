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
  Icon,
  Link,
} from "framework7-react";
import ScheduleCalendar from "../../components/Schedule/Calendar";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import subjects from "../../utils/subjects";
import { convertTo12HourFormat } from "../../utils/time";
import ConditionalButton from "../../components/Admin/Button";

export default function ScheduleHome() {
  const data = useLoaderData() as {
    schedule: Schedule[];
    user: User;
  };
  const [sParam, setSParam] = useSearchParams();
console.log(sParam.get("date"))
  return (
    <Page>
      <ConditionalButton
        user={data.user}
        className="px-4 flex justify-end mt-2 -mb-5"
        label="New Schedule"
        navigate="./new"
      />
      {/* <BlockTitle>Schedule</BlockTitle> */}
      <ScheduleCalendar />
      <Block className=" flex">
        <ConditionalButton
          {...data}
          className="mb-4"
          label="Edit"
          navigate={"./edit?selected=" + sParam.get("date")}
          buttonProps={{ small: true }}
        />
      </Block>
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
