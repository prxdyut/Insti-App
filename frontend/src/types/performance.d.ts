type ScoresPerformance = {
  [key as import("../utils/subjects").Subject]: string;
  month: string;
};

type AttendancePerformance = {
  present: number;
  absent: number;
  month: string;
};

