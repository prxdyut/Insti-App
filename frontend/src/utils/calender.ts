import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  getWeek,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";

function getRandomTime() {
  // Generate random hour and minute
  const hour = Math.floor(Math.random() * 12) + 1; // 1 to 12
  const minute = Math.floor(Math.random() * 60); // 0 to 59
  const period = Math.random() < 0.5 ? "AM" : "PM"; // Randomly choose AM or PM

  // Format the minute to always be two digits
  const minuteFormatted = minute < 10 ? "0" + minute : minute;

  return `${hour}:${minuteFormatted} ${period}`;
}

function generateRandomPunches() {
  const random = Math.random() < 0.2;
  if (random) {
    return [];
  } else {
    return [getRandomTime(), getRandomTime()];
  }
}

type DateInfo = {
  date: Date;
  formatted: string;
  day: number;
  week: number;
  isInCurrentMonth: boolean;
  isToday: boolean;
};

export function getDetailedCalendar(dateStr: string) {
  const date = new Date(dateStr);
  const month = date.getMonth();
  const year = date.getFullYear();
  const startDate = startOfWeek(startOfMonth(new Date(year, month)));
  const endDate = endOfWeek(endOfMonth(new Date(year, month)));

  const isHoliday = () => Math.random() < 0.1;

  const calendar = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    let holiday = isHoliday();
    const dateInfo: DateInfo = {
      date: currentDate,
      formatted: format(currentDate, "yyyy-MM-dd"),
      day: getDay(currentDate),
      week: getWeek(currentDate),
      isInCurrentMonth: isSameMonth(currentDate, new Date(year, month)),
      isToday: isToday(currentDate),
    };
    calendar.push(dateInfo);
    currentDate = addDays(currentDate, 1);
  }

  return calendar;
}

export function getAttendanceCalendar(dateStr: string) {
  const date = new Date(dateStr);
  const month = date.getMonth();
  const year = date.getFullYear();
  const startDate = startOfWeek(startOfMonth(new Date(year, month)));
  const endDate = endOfWeek(endOfMonth(new Date(year, month)));
  const isHoliday = () => Math.random() < 0.1;
  const calendar = [];
  let currentWeek = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    let holiday = isHoliday();
    const dateInfo = {
      date: currentDate,
      punches: holiday ? [] : generateRandomPunches(),
      holiday,
    };
    calendar.push(dateInfo);
    currentDate = addDays(currentDate, 1);
  }
  return calendar;
}
