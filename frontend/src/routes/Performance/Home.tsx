import { Page } from "framework7-react";
import OverallChart from "../../components/Performance/OverallChart";
import AttendanceChart from "../../components/Performance/AttendanceChart";
import ScoreChart from "../../components/Performance/ScoreChart";
import { useLoaderData } from "react-router-dom";
import ConditionalButton from "../../components/Admin/Button";

export default function PerformanceHome() {
  const data = useLoaderData() as {
    overall: number;
    scores: ScoresPerformanceRef[];
    attendance: AttendancePerformanceRef[];
    user: User
  };

  return (
    <Page>
      <OverallChart {...data} />
      <AttendanceChart {...data} />
      <ScoreChart {...data} />
    </Page>
  );
}
