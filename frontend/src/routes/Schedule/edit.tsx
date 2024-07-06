import { Block, BlockTitle, Page, f7 } from "framework7-react";
import { useEffect, useRef } from "react";
import { format, sub } from "date-fns";
import FormBuilder from "../../components/Form/Builder";
import useFormHandler from "../../hooks/formHandler";
import { useLoaderData, useSearchParams } from "react-router-dom";
export default function ScheduleEdit() {
  const { selected, schedule } = useLoaderData() as {
    selected: Date[];
    schedule: Schedule[][];
  };
  const formHandler = useFormHandler();
  const extendedStructure: FormBuilder[][] = schedule.map((_) =>
    _.flatMap((__): FormBuilder[] => [
      { type: "block", label: format(__.date, "dd MMM, yyyy") },
      { type: "hidden", name: "uid", value: __.uid },
      { type: "hidden", name: "date", value: __.date.toISOString() },
      {
        type: "time",
        name: "start",
        placeholder: "Enter Start Time in 24 hour format",
        label: "Start",
        required: false,
        defaultValue: __.time.from,
      },
      {
        type: "time",
        name: "end",
        placeholder: "Enter End Time in 24 hour format",
        label: "End",
        required: false,
        defaultValue: __.time.to,
      },
      {
        type: "subject",
        placeholder: "Subject",
        label: "Subject",
        required: false,
        value: __.subject,
      },
    ])
  );

  return (
    <Page>
      <CalendarBlock />
      {extendedStructure.map((structure, i) => (
        <FormBuilder structure={structure} submit="Save to Schedule" />
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
        value: [sub(new Date(searchParams.get('selected') as string), {days: 1})],
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
            setSearchParms(searchParams, {replace: true});
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
