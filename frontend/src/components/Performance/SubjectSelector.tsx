import * as React from "react";
import { List, ListInput, f7 } from "framework7-react";
import { setPerformanceSubject } from "../../events/performanceSubjectSelector";
import subjects from "../../utils/subjects";

export default function SubjectSelector() {
  const [selected, setSelected] = React.useState<string>();
  const pickerDevice = React.useRef<any>(null);
  let calenderInitial = true;

  const onPageInit = () => {
    if (calenderInitial) calenderInitial = false;
    else {
      pickerDevice.current = f7.picker.create({
        inputEl: "#subject-selector",
        on: {
          change: setSubject,
        },
        cols: [
          {
            textAlign: "center",
            values: ["overview", ...subjects()],
          },
        ],
      });

      calenderInitial = false;
    }
  };

  const onPageBeforeRemove = () => {
    pickerDevice.current?.destroy();
  };

  React.useEffect(() => {
    onPageInit();
    return onPageBeforeRemove;
  }, []);

  const setSubject = ({ value }: any) => {
    setSelected(value);
    setPerformanceSubject(value);
  };

  return (
    <List outlineIos strongIos>
      <ListInput
        type="text"
        placeholder="Select Subject"
        readonly
        label={"Subject"}
        inputId="subject-selector"
        outline
      />
    </List>
  );
}
