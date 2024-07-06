import React, { useRef, useEffect, useState } from "react";
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
import { useSearchParams } from "react-router-dom";
import { add } from "date-fns";

export default function ScheduleCalendar() {
  const calendarInline = useRef<any>(null);
  let calenderInitial = true;
  const [selected, setSelected] = useState<Date>(new Date());
  const [sParam, setSParam] = useSearchParams();

  useEffect(() => {
    sParam.set("date", selected.toISOString());
    setSParam(sParam);
  }, [selected]);

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
            setSelected(add((value as Date[])[0], {days: 1}));
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
    <Block strong className="no-padding">
      <div id="demo-calendar-inline-container" />
    </Block>
  );
}
