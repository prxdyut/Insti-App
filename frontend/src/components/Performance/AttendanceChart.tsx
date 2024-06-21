import * as React from "react";
import { Block, BlockTitle } from "framework7-react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Stack } from "@mui/material";
import { getPerformanceSubject } from "../../events/performanceSubjectSelector";

export default function AttendanceChart({
  attendance,
}: {
  attendance: AttendancePerformanceRef[];
}) {
  const [subject, setSubject] = React.useState("");
  getPerformanceSubject((value: string) => setSubject(value));

  const dataset = attendance;

  const pieParams = { height: 200, width: 200, margin: { right: 5 } };

  return (
    <React.Fragment>
      <BlockTitle>Attendance</BlockTitle>
      <Block className="overflow-auto no-padding">
        <Stack
          direction="row"
          width="100%"
          textAlign="center"
          spacing={2}
          className=" pl-4"
        >
          {dataset.map((data, i) => (
            <Box flexGrow={1} className=" py-4" key={i}>
              <p className=" font-bold text-lg">{data.month}</p>
              <PieChart
                series={[
                  {
                    data: [
                      { value: data.present, label: "Present" },
                      { value: data.absent, label: "Absent" },
                    ],
                    innerRadius: 30,
                    paddingAngle: 2.5,
                    cornerRadius: 5,
                  },
                ]}
                sx={{ "& .MuiChartsLegend-root": { visibility: "hidden" } }}
                {...pieParams}
              />
            </Box>
          ))}
        </Stack>
      </Block>
    </React.Fragment>
  );
}
