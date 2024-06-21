import { del, get, set, update } from "idb-keyval";
import subjects from "../utils/subjects";

export const alertsProvider: Provider<{ alerts: Alert[] }> = {
  data: { alerts: [] },
  initial: true,
  async load() {
    const data :{ alerts: Alert[] }= {
      alerts: [
        {
          uid: "AL45123",
          title: "Holiday on account of Diwali",
          description: "<p>School will remain closed on 10th November due to Diwali celebrations.</p>",
          date: new Date("2023-11-10"),
          summary: "Diwali holiday announcement.",
          button: {
            link: "/holidays",
            label: "More Details",
          },
        },
        {
          uid: "AL29875",
          title: "PTM Scheduled on 4th October",
          description: "<p>Parent-Teacher Meeting scheduled on 4th October. Please be present.</p>",
          date: new Date("2023-10-04"),
          summary: "Reminder for the upcoming Parent-Teacher Meeting.",
          button: {
            link: "/ptm",
            label: "View Schedule",
          },
        },
        {
          uid: "AL67321",
          title: "Student Absent from class",
          description: "<p>Your ward was absent from class today. Please provide a valid reason.</p>",
          date: new Date("2023-09-20"),
          summary: "Absence notice for your ward.",
          button: {
            link: "/attendance",
            label: "Submit Reason",
          },
        },
        {
          uid: "AL56372",
          title: "Annual Sports Day",
          description: "<p>Annual Sports Day will be held on 15th December. Students must participate.</p>",
          date: new Date("2023-12-15"),
          summary: "Invitation to Annual Sports Day.",
          button: {
            link: "/sportsday",
            label: "Event Details",
          },
        },
        {
          uid: "AL48290",
          title: "New Library Books",
          description: "<p>New books have been added to the library. Visit to check them out.</p>",
          date: new Date("2023-09-25"),
          summary: "Announcement of new library books.",
          button: {
            link: "/library",
            label: "View Books",
          },
        },
        {
          uid: "AL31029",
          title: "Science Fair",
          description: "<p>Science Fair scheduled for 20th November. Register your projects.</p>",
          date: new Date("2023-11-20"),
          summary: "Participation invitation for Science Fair.",
          button: {
            link: "/sciencefair",
            label: "Register Now",
          },
        },
        {
          uid: "AL83729",
          title: "Fee Submission Deadline",
          description: "<p>Last date to submit school fees is 5th October.</p>",
          date: new Date("2023-10-05"),
          summary: "Reminder for fee submission deadline.",
          button: {
            link: "/fees",
            label: "Pay Fees",
          },
        },
        {
          uid: "AL19283",
          title: "Exam Schedule Released",
          description: "<p>Mid-term exam schedule is now available. Check the dates.</p>",
          date: new Date("2023-09-30"),
          summary: "Mid-term exam schedule release.",
          button: {
            link: "/exams",
            label: "View Schedule",
          },
        },
        {
          uid: "AL54637",
          title: "Art Competition",
          description: "<p>Art competition will be held on 10th October. Participate and win prizes.</p>",
          date: new Date("2023-10-10"),
          summary: "Invitation to participate in art competition.",
          button: {
            link: "/artcompetition",
            label: "Register Now",
          },
        },
        {
          uid: "AL76283",
          title: "School Trip",
          description: "<p>School trip to the museum on 18th September. Submit consent forms.</p>",
          date: new Date("2023-09-18"),
          summary: "Details about the upcoming school trip.",
          button: {
            link: "/trip",
            label: "More Info",
          },
          files: [
            {
              _id: "F001",
              url: "/files/Consent_Form_School_Trip.pdf",
              size: "250KB",
              type: "pdf",
              title: "Consent Form",
              name: "Consent_Form_School_Trip.pdf",
              date: new Date("2023-09-01"),
              icon: "insert_drive_file",
              by: {
                userId: "U12345",
                firstName: "John",
                lastName: "Doe",
                phoneNumber: "123-456-7890",
                meta: {
                  role: "Teacher",
                },
                token: "abc123",
              },
            },
          ],
        },
        {
          uid: "AL32874",
          title: "Health Check-up Camp",
          description: "<p>Health check-up camp on 22nd September. Mandatory for all students.</p>",
          date: new Date("2023-09-22"),
          summary: "Mandatory health check-up camp information.",
          button: {
            link: "/healthcamp",
            label: "Details",
          },
          files: [
            {
              _id: "F002",
              url: "/files/Health_Checkup_Consent_Form.pdf",
              size: "200KB",
              type: "pdf",
              title: "Health Check-up Consent Form",
              name: "Health_Checkup_Consent_Form.pdf",
              date: new Date("2023-09-10"),
              icon: "insert_drive_file",
              by: {
                userId: "U12345",
                firstName: "Jane",
                lastName: "Smith",
                phoneNumber: "987-654-3210",
                meta: {
                  role: "Nurse",
                },
                token: "def456",
              },
            },
          ],
        },
        {
          uid: "AL54982",
          title: "Extra Classes",
          description: "<p>Extra classes for Math on Saturdays. Attendance is compulsory.</p>",
          date: new Date("2023-09-16"),
          summary: "Schedule for extra Math classes.",
          button: {
            link: "/extraclasses",
            label: "View Schedule",
          },
        },
      ]
    };

    alertsProvider.initial = false;
    alertsProvider.data = data;
  },
};
