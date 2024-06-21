import { del, get, set, update } from "idb-keyval";
import subjects from "../utils/subjects";

export const scheduleProvider: Provider<{ schedule: Schedule[] }> = {
  data: { schedule: [] },
  initial: true,
  async load({ date, dates }: { date?: Date; dates?: Date[] }) {
    const data: { schedule: Schedule[] } = {
      schedule: [
        {
          uid: "1",
          subject: 3,
          date: new Date('2024-06-21'),
          by: {
            firstName: "Pradyut",
            lastName: "Das",
          },
          time: {
            from: "16:00", // 24-hour format for HTML time input
            to: "18:00",   // 24-hour format for HTML time input
          },
        },
        {
          uid: "2",
          subject: 2,
          date: new Date('2024-06-22'),
          by: {
            firstName: "Pradyut",
            lastName: "Das",
          },
          time: {
            from: "18:00", // 24-hour format for HTML time input
            to: "20:00",   // 24-hour format for HTML time input
          },
        },
        // Adding more schedule items
        {
          uid: "3",
          subject: 1,
          date: new Date('2024-06-23'),
          by: {
            firstName: "John",
            lastName: "Doe",
          },
          time: {
            from: "09:00",
            to: "11:00",
          },
        },
        {
          uid: "4",
          subject: 4,
          date: new Date('2024-06-24'),
          by: {
            firstName: "Jane",
            lastName: "Smith",
          },
          time: {
            from: "14:00",
            to: "16:00",
          },
        },
      ],
    };

    scheduleProvider.initial = false;
    scheduleProvider.data = data;
  },
};
