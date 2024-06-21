import { Subject } from "src/utils/subjects";

type ScoresPerformance = {
  [key as Subject]: string;
  month: string;
};

type AttendancePerformance = {
  present: number;
  absent: number;
  month: string;
};

