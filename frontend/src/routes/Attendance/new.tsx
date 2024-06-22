import { Block, BlockTitle, Page, f7 } from "framework7-react";
import { useEffect, useRef } from "react";
import FormBuilder from "../../components/Form/Builder";
import useFormHandler from "../../hooks/formHandler";
import { useLoaderData, useSearchParams } from "react-router-dom";
 

export default function AttendanceNew() {
  const { selected, users } = useLoaderData() as {
    selected: Date;
    users: User[];
  };

  const formHandler = useFormHandler();

  const structure: FormBuilder[] = [
    { type: "block", label: "New Attendance" },
    { type: "hidden", name: "date", value: selected.toISOString() },
    {
      type: "option",
      options: users.map((user) => ({
        value: user.userId,
        label: `${user.firstName} ${user.lastName} - ${user.userId}`,
      })),
      label: "Student",
      placeholder: "",
      name: "student",
    },
    {
      type: "time",
      name: "time",
      placeholder: "Punch Time",
      required: true,
      label: "Time",
    },
  ];

  return (
    <Page>
      <CalendarBlock />
      <FormBuilder structure={structure} submit="Add to Attendance" />
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
              new Date(value as string).toISOString()
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
      <Block strong className="no-padding">
        <div id="demo-calendar-inline-container" />
      </Block>
    </div>
  );
}
