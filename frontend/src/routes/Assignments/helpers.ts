import { differenceInDays } from "date-fns";

export function formatDays(date: Assignment["date"]): string {
  const endDate = date.end;
  const difference = differenceInDays(endDate, new Date());
  return `${Math.abs(difference)} day${difference !== 1 ? "s" : ""}`;
}

export function colorState(
  date: Assignment["date"],
  submissions: Submission[]
): string {
  const endDate = date.end;
  const difference = differenceInDays(endDate, new Date());
  const expired = difference > 0;

  if (submissions.length) return "submitted";
  if (!expired) return "pending";

  return "expired";
}
