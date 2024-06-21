import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Block, BlockTitle, List, ListInput, Page, f7 } from "framework7-react";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Stack } from "@mui/material";
import {
  getPerformanceSubject,
  setPerformanceSubject,
} from "../../events/performanceSubjectSelector";
import { valueFormatter } from "../../routes/Performance/helpers";
import GaugePointer from "../../components/Gauge/Pointer";
import SubjectSelector from "./SubjectSelector";

export default function ScoreChart({
  scores,
}: {
  scores: ScoresPerformanceRef[];
}) {
  const [subject, setSubject] = React.useState("");
  getPerformanceSubject((value: string) => setSubject(value));

  const subjectSelected = !(subject[0] == "overview" || !subject);

  const dataset = subjectSelected
    ? scores.map((score) => ({ [subject]: score[subject] }))
    : scores;

  const series = [
    { dataKey: "english", label: "English", valueFormatter },
    { dataKey: "hindi", label: "Hindi", valueFormatter },
    { dataKey: "marathi", label: "Marathi", valueFormatter },
    { dataKey: "maths", label: "Maths", valueFormatter },
    { dataKey: "science", label: "Science", valueFormatter },
    { dataKey: "history", label: "History", valueFormatter },
    { dataKey: "geography", label: "Geography", valueFormatter },
  ];

  return (
    <React.Fragment>
      <BlockTitle>Scores</BlockTitle>
      {/* <SubjectSelector /> */}
      <Block className="no-padding overflow-auto">
        <Box className="">
          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            width={3000}
            height={250}
            series={series}
            sx={{ "& .MuiChartsLegend-root": { visibility: "hidden" } }}
          />
        </Box>
      </Block>
    </React.Fragment>
  );
}
