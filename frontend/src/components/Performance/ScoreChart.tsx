import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Block, BlockTitle } from "framework7-react";
import { Box } from "@mui/material";
import { getPerformanceSubject } from "../../events/performanceSubjectSelector";
import { valueFormatter } from "../../routes/Performance/helpers";

export default function ScoreChart({
  scores,
}: {
  scores: ScoresPerformanceRef[];
}) {

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
            dataset={scores}
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
