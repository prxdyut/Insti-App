import * as React from "react";
import { Block, BlockTitle } from "framework7-react";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
} from "@mui/x-charts/Gauge";
import { Box } from "@mui/material";
import { getPerformanceSubject } from "../../events/performanceSubjectSelector";
import GaugePointer from "../../components/Gauge/Pointer";

export default function OverallChart({ overall }: { overall: number }) {
  const [subject, setSubject] = React.useState("");
  getPerformanceSubject((value: string) => setSubject(value));

  return (
    <React.Fragment>
      <BlockTitle>Overall</BlockTitle>
      <Block className="overflow-auto no-padding">
        <Box className={`py-4 flex flex-col items-center `}>
          <GaugeContainer
            width={200}
            height={140}
            startAngle={-110}
            endAngle={110}
            value={overall}
          >
            <GaugeReferenceArc />
            <GaugeValueArc />
            <GaugePointer />
          </GaugeContainer>
          <p className=" mt-2 mb-0 text-3xl font-bold">{overall} / 100</p>
        </Box>
      </Block>
    </React.Fragment>
  );
}
