export default function (
  data: { attendances: any; holidays: any[] },
  startDate: Date,
  endDate: Date
) {
  const { attendances, holidays } = data;

  const start = startDate.getTime();
  const end = endDate.getTime();
  const totalDays = (end - start) / (1000 * 60 * 60 * 24) + 1;

  const attendanceDates = new Set(
    attendances.map((a) => a.date.toISOString().split("T")[0])
  );
  const holidayDates = new Set(holidays.map((h) => h.date.toISOString().split("T")[0]));

  let punchedDays = 0;
  let holidayDays = 0;
  let notPunchedDays = 0;

  for (
    let d = new Date(start);
    d.getTime() <= end;
    d.setDate(d.getDate() + 1)
  ) {
    const dateString = d.toISOString().split("T")[0];
    if (attendanceDates.has(dateString)) {
      punchedDays++;
    } else if (holidayDates.has(dateString)) {
      holidayDays++;
    } else {
      notPunchedDays++;
    }
  }

  return {
    punchedPercentage: Math.round((punchedDays / totalDays) * 100),
    holidayPercentage: Math.round((holidayDays / totalDays) * 100),
    notPunchedPercentage: Math.round((notPunchedDays / totalDays) * 100),
  };
}
