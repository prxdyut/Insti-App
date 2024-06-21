import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  getMonth,
  getWeek,
  isSameDay,
  isSameMonth,
  isToday,
  setDate,
  setMonth,
  setYear,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import {
  Block,
  BlockTitle,
  Button,
  Icon,
  Link,
  List,
  ListInput,
  ListItem,
  Page,
} from "framework7-react";
import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { getDetailedCalendar } from "../../utils/calender";
import { useSearchParams } from "react-router-dom";

export default function AttendanceCalendar({
  attendance,
}: {
  attendance: Attendance[];
}) {
  const defaultDate = new Date();
  const [sParam, setSParam] = useSearchParams();
  const [selected, setSelected] = useState<Date>(defaultDate);

  useEffect(() => {
    sParam.set("date", selected.toISOString());
    setSParam(sParam);
  }, [selected]);

  const calendar = getDetailedCalendar(selected.toISOString()).map((_) => ({
    ..._,
    ...attendance.find((__) => isSameDay(_.date, __.date)),
  }));

  const incrementMonth = () => setSelected((_) => addMonths(_ as Date, 1));
  const decrementMonth = () => setSelected((_) => subMonths(_ as Date, 1));

  const setYear_ = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setSelected((_) => setYear(_, Number(target.value)));
  const setMonth_ = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setSelected((_) => setMonth(_, Number(target.value)));
  const setDay = (date: Date) => setSelected(date);
  const data = calendar.find((_) => isSameDay(_.date, selected));

  return (
    <React.Fragment>
      <style>
        {`
            .calender .list{
              margin: 0
            }
            .calender .list ul {
              display: flex;
              gap: 8px;
            }
            .calender .list .item-input{
              margin-inline: 0px!important
            }
          `}
      </style>
      <Block className="calender">
        <div className="mt-6 flex justify-around items-center">
          <Link iconMaterial="chevron_left" onClick={decrementMonth} />
          <div style={{ display: "flex" }}>
            <div className=" font-bold text-lg">
              {format(
                new Date(
                  Number(data?.date?.getFullYear()),
                  Number(data?.date?.getMonth()),
                  Number(data?.date?.getDate())
                ),
                "d MMMM,"
              )}
            </div>
            &nbsp;
            <div className=" font-bold text-lg">
              {format(
                new Date(
                  Number(data?.date?.getFullYear()),
                  Number(data?.date?.getMonth()),
                  Number(data?.date?.getDate())
                ),
                "yyyy"
              )}
            </div>
            <List className=" hidden">
              <ListInput
                id="selectMonth"
                label="Month"
                type="select"
                value={`${selected.getMonth()}`}
                placeholder="Please choose..."
                outline
                floatingLabel
                style={{ paddingLeft: 0 }}
                onChange={setMonth_}
              >
                <option value="0">&nbsp;January&nbsp;</option>
                <option value="1">&nbsp;February&nbsp;</option>
                <option value="2">&nbsp;March&nbsp;</option>
                <option value="3">&nbsp;April&nbsp;</option>
                <option value="4">&nbsp;May&nbsp;</option>
                <option value="5">&nbsp;June&nbsp;</option>
                <option value="6">&nbsp;July&nbsp;</option>
                <option value="7">&nbsp;August&nbsp;</option>
                <option value="8">&nbsp;September&nbsp;</option>
                <option value="9">&nbsp;October&nbsp;</option>
                <option value="10">&nbsp;November&nbsp;</option>
                <option value="11">&nbsp;December&nbsp;</option>
              </ListInput>
              <ListInput
                id="selectYear"
                label="Year"
                type="select"
                value={`${selected.getFullYear()}`}
                placeholder="Please choose..."
                outline
                floatingLabel
                style={{ paddingLeft: 0 }}
                onChange={setYear_}
              >
                {Array(new Date().getFullYear() - 2020)
                  .fill(null)
                  .map((_, i) => (
                    <option value={`${2020 + i + 1}`} key={i}>{`${
                      2020 + i + 1
                    }`}</option>
                  ))
                  .reverse()}
              </ListInput>
            </List>
          </div>
          <Link iconMaterial="chevron_right" onClick={incrementMonth} />
        </div>
        <div className=" mt-4 grid grid-cols-7 gap-1">
          {calendar.map((row, i) => (
            <div
              key={i}
              className={` flex justify-center items-center rounded-xl py-2 flex-col ${
                !row.isInCurrentMonth && "opacity-0"
              } ${row.isToday && " border-2"} ${
                selected &&
                isSameDay(row.date, selected) &&
                "bg-gray-200 drop-shadow-lg"
              }`}
              onClick={() => setDay(row.date)}
            >
              {row.date.getDate()}

              {row.holiday ? (
                <Icon material="mood" />
              ) : row?.punches?.length ? (
                <Icon material="person" color="green" />
              ) : (
                <Icon material="person_off" color="red" />
              )}
            </div>
          ))}
        </div>
      </Block>
    </React.Fragment>
  );
}
