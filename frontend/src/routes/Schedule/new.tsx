import {
  AccordionContent,
  Block,
  BlockTitle,
  List,
  ListItem,
  Page,
  f7,
} from "framework7-react";
import React, { useEffect, useRef, useState } from "react";
import {
  changeCalendarScheduleEdit,
  onCalendarScheduleEdit,
} from "../../events/calendarScheduleEdit";
import { eachDayOfInterval, format } from "date-fns";
import FormBuilder from "../../components/Form/Builder";
import useFormHandler from "../../hooks/formHandler";
import { useLoaderData, useSearchParams } from "react-router-dom";

export default function ScheduleNew() {
  const { selected } = useLoaderData() as { selected: Date[] };

  const formHandler = useFormHandler();
  const allDatesSelected =
    selected.length == 2
      ? eachDayOfInterval({
          start: selected[0],
          end: selected[1],
        })
      : selected;

  const extendedStructure = allDatesSelected.map((_): FormBuilder[] => [
    { type: "block", label: format(_, "dd MMM, yyyy") },
    { type: "hidden", name: "date", value: _.toISOString() },
    {
      type: "time",
      name: "start",
      placeholder: "Enter Start Time in 24 hour format",
      label: "Start",
      required: false,
    },
    {
      type: "time",
      name: "end",
      placeholder: "Enter End Time in 24 hour format",
      label: "End",
      required: false,
    },
    {
      type: "subject",
      placeholder: "Subject",
      label: "Subject",
      required: false,
    },
  ]);

  return (
    <Page>
      <CalendarBlock />
      {extendedStructure.map((structure, i) => (
        <FormBuilder structure={structure} submit="Add to Schedule" />
      ))}
    </Page>
  );
}

function CalendarBlock() {
  const [searchParams, setSearchParms] = useSearchParams();
  const calendarInline = useRef<any>(null);
  let calenderInitial = true;

  const onPageInit = () => {
    if (calenderInitial) calenderInitial = false;
    else {
      const $ = f7.$;
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      calendarInline.current = f7.calendar.create({
        containerEl: "#demo-calendar-inline-container",
        value: [new Date()],
        rangePicker: true,
        renderToolbar() {
          return `
            <div class="toolbar calendar-custom-toolbar">
              <div class="toolbar-inner">
                <div class="left">
                  <a class="link icon-only"><i class="icon icon-back"></i></a>
                </div>
                <div class="center"></div>
                <div class="right">
                  <a class="link icon-only"><i class="icon icon-forward"></i></a>
                </div>
              </div>
            </div>
          `;
        },
        on: {
          init(c) {
            $(".calendar-custom-toolbar .center").text(
              `${monthNames[c.currentMonth]}, ${c.currentYear}`
            );
            $(".calendar-custom-toolbar .left .link").on("click", () => {
              calendarInline.current?.prevMonth();
            });
            $(".calendar-custom-toolbar .right .link").on("click", () => {
              calendarInline.current?.nextMonth();
            });
          },
          monthYearChangeStart(c) {
            $(".calendar-custom-toolbar .center").text(
              `${monthNames[c.currentMonth]}, ${c.currentYear}`
            );
          },
          change(calendar, value) {
            searchParams.set(
              "selected",
              (value as Date[]).map((_) => _.toISOString()).join(",")
            );
            setSearchParms(searchParams);
          },
        },
      });

      calenderInitial = false;
    }
  };

  const onPageBeforeRemove = () => {
    calendarInline.current?.destroy();
  };

  useEffect(() => {
    onPageInit();
    return onPageBeforeRemove;
  }, []);

  return (
    <div>
      <BlockTitle>Create Schedule</BlockTitle>
      <Block strong className="no-padding">
        <div id="demo-calendar-inline-container" />
      </Block>
    </div>
  );
}
