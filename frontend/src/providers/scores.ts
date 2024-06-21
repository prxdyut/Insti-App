import { del, get, set, update } from "idb-keyval";
import subjects from "../utils/subjects";

export const scoresProvider: Provider<{ scores: Score[] }> = {
  data: { scores: [] },
  initial: true,
  async load() {
    const data = {
      scores: [
        {
          uid: "SC12345",
          subject: 4,
          testId: "dsacdsc",
          title: "Weekly Test",
          marks: {
            obtained: 87,
            total: 100,
          },
          date: new Date("2024-05-16T09:08:09.847Z"),
          questions: [
            {
              _id: "Q001",
              url: "/files/Weekly_Test_Questions.pdf",
              size: "300KB",
              type: "pdf",
              title: "Weekly Test Questions",
              name: "Weekly_Test_Questions.pdf",
              date: new Date("2024-05-15"),
              icon: "insert_drive_file",
              by: {
                userId: "U56789",
                firstName: "Sarah",
                lastName: "Lee",
                phoneNumber: "456-789-0123",
                meta: {
                  role: "Teacher",
                },
                token: "mno456",
              },
            },
          ],
          answers: [
            {
              _id: "A001",
              url: "/files/Weekly_Test_Answers.pdf",
              size: "250KB",
              type: "pdf",
              title: "Weekly Test Answers",
              name: "Weekly_Test_Answers.pdf",
              date: new Date("2024-05-17"),
              icon: "insert_drive_file",
              by: {
                userId: "U56789",
                firstName: "Sarah",
                lastName: "Lee",
                phoneNumber: "456-789-0123",
                meta: {
                  role: "Teacher",
                },
                token: "mno456",
              },
            },
          ],
        },
        {
          uid: "SC23456",
          subject: 2,
          testId: "fdgdskj",
          title: "Math Quiz",
          marks: {
            obtained: 95,
            total: 100,
          },
          date: new Date("2024-05-30T09:08:09.847Z"),
          questions: [
            {
              _id: "Q002",
              url: "/files/Math_Quiz_Questions.pdf",
              size: "400KB",
              type: "pdf",
              title: "Math Quiz Questions",
              name: "Math_Quiz_Questions.pdf",
              date: new Date("2024-05-29"),
              icon: "insert_drive_file",
              by: {
                userId: "U67890",
                firstName: "David",
                lastName: "Smith",
                phoneNumber: "789-012-3456",
                meta: {
                  role: "Teacher",
                },
                token: "pqr789",
              },
            },
          ],
          answers: [
            {
              _id: "A002",
              url: "/files/Math_Quiz_Answers.pdf",
              size: "350KB",
              type: "pdf",
              title: "Math Quiz Answers",
              name: "Math_Quiz_Answers.pdf",
              date: new Date("2024-05-31"),
              icon: "insert_drive_file",
              by: {
                userId: "U67890",
                firstName: "David",
                lastName: "Smith",
                phoneNumber: "789-012-3456",
                meta: {
                  role: "Teacher",
                },
                token: "pqr789",
              },
            },
          ],
        },
        {
          uid: "SC34567",
          subject: 3,
          testId: "asdfrwe",
          title: "Science Experiment",
          marks: {
            obtained: 78,
            total: 100,
          },
          date: new Date("2024-05-27T09:08:09.847Z"),
          questions: [
            {
              _id: "Q003",
              url: "/files/Science_Experiment_Questions.pdf",
              size: "500KB",
              type: "pdf",
              title: "Science Experiment Questions",
              name: "Science_Experiment_Questions.pdf",
              date: new Date("2024-05-26"),
              icon: "insert_drive_file",
              by: {
                userId: "U34567",
                firstName: "Emily",
                lastName: "Johnson",
                phoneNumber: "123-123-1234",
                meta: {
                  role: "Science Teacher",
                },
                token: "ghi789",
              },
            },
          ],
          answers: [
            {
              _id: "A003",
              url: "/files/Science_Experiment_Answers.pdf",
              size: "450KB",
              type: "pdf",
              title: "Science Experiment Answers",
              name: "Science_Experiment_Answers.pdf",
              date: new Date("2024-05-28"),
              icon: "insert_drive_file",
              by: {
                userId: "U34567",
                firstName: "Emily",
                lastName: "Johnson",
                phoneNumber: "123-123-1234",
                meta: {
                  role: "Science Teacher",
                },
                token: "ghi789",
              },
            },
          ],
        },
        {
          uid: "SC45678",
          subject: 1,
          testId: "sdgfhgf",
          title: "History Exam",
          marks: {
            obtained: 82,
            total: 100,
          },
          date: new Date("2024-06-09T09:08:09.847Z"),
          questions: [
            {
              _id: "Q004",
              url: "/files/History_Exam_Questions.pdf",
              size: "600KB",
              type: "pdf",
              title: "History Exam Questions",
              name: "History_Exam_Questions.pdf",
              date: new Date("2024-06-08"),
              icon: "insert_drive_file",
              by: {
                userId: "U45678",
                firstName: "Michael",
                lastName: "Brown",
                phoneNumber: "321-321-4321",
                meta: {
                  role: "History Teacher",
                },
                token: "jkl012",
              },
            },
          ],
          answers: [
            {
              _id: "A004",
              url: "/files/History_Exam_Answers.pdf",
              size: "550KB",
              type: "pdf",
              title: "History Exam Answers",
              name: "History_Exam_Answers.pdf",
              date: new Date("2024-06-10"),
              icon: "insert_drive_file",
              by: {
                userId: "U45678",
                firstName: "Michael",
                lastName: "Brown",
                phoneNumber: "321-321-4321",
                meta: {
                  role: "History Teacher",
                },
                token: "jkl012",
              },
            },
          ],
        },
        {
          uid: "SC56789",
          subject: 5,
          testId: "oplkjhg",
          title: "Literature Review",
          marks: {
            obtained: 90,
            total: 100,
          },
          date: new Date("2024-06-05T09:08:09.847Z"),
          questions: [
            {
              _id: "Q005",
              url: "/files/Literature_Review_Questions.pdf",
              size: "200KB",
              type: "pdf",
              title: "Literature Review Questions",
              name: "Literature_Review_Questions.pdf",
              date: new Date("2024-06-04"),
              icon: "insert_drive_file",
              by: {
                userId: "U67890",
                firstName: "David",
                lastName: "Smith",
                phoneNumber: "789-012-3456",
                meta: {
                  role: "Literature Teacher",
                },
                token: "pqr789",
              },
            },
          ],
          answers: [
            {
              _id: "A005",
              url: "/files/Literature_Review_Answers.pdf",
              size: "150KB",
              type: "pdf",
              title: "Literature Review Answers",
              name: "Literature_Review_Answers.pdf",
              date: new Date("2024-06-06"),
              icon: "insert_drive_file",
              by: {
                userId: "U67890",
                firstName: "David",
                lastName: "Smith",
                phoneNumber: "789-012-3456",
                meta: {
                  role: "Literature Teacher",
                },
                token: "pqr789",
              },
            },
          ],
        },
      ],
    };

    scoresProvider.initial = false;
    scoresProvider.data = data;
  },
};

export const allScoresProvider: Provider<{ scores: AllScore[] }> = {
  data: { scores: [] },
  initial: true,
  async load() {
    const data = {
      scores: [
        {
          uid: "101",
          testId: "T1",
          title: "Midterm Exam",
          subject: 19, // computer science
          total: 100,
          obtained: [85, 90, 78],
          users: "1,2,3",
          answers: [
            {
              _id: "A1",
              url: "http://example.com/answers1",
              size: "15MB",
              type: "application/pdf",
              title: "Answers",
              name: "Midterm Answers",
              date: new Date("2023-06-01T00:00:00.000Z"),
              icon: "pdf_icon.png",
              by: {
                userId: "1",
                firstName: "John",
                lastName: "Doe",
                phoneNumber: "123-456-7890",
                meta: {
                  grade: "A",
                  major: "Computer Science",
                },
                token: "abc123",
              },
            },
          ],
          questions: [
            {
              _id: "Q1",
              url: "http://example.com/questions1",
              size: "10MB",
              type: "application/pdf",
              title: "Questions",
              name: "Midterm Questions",
              date: new Date("2023-05-25T00:00:00.000Z"),
              icon: "pdf_icon.png",
              by: {
                userId: "1",
                firstName: "John",
                lastName: "Doe",
                phoneNumber: "123-456-7890",
                meta: {
                  grade: "A",
                  major: "Computer Science",
                },
                token: "abc123",
              },
            },
          ],
          date: new Date("2023-06-10T00:00:00.000Z"),
        },
        {
          uid: "102",
          testId: "T2",
          title: "Final Exam",
          subject: 18, // mathematics
          total: 100,
          obtained: [88, 76, 92],
          users: "4,5,6",
          answers: [
            {
              _id: "A2",
              url: "http://example.com/answers2",
              size: "20MB",
              type: "application/pdf",
              title: "Answers",
              name: "Final Answers",
              date: new Date("2023-12-01T00:00:00.000Z"),
              icon: "pdf_icon.png",
              by: {
                userId: "2",
                firstName: "Jane",
                lastName: "Smith",
                phoneNumber: "987-654-3210",
                meta: {
                  grade: "B",
                  major: "Mathematics",
                },
                token: "def456",
              },
            },
          ],
          questions: [
            {
              _id: "Q2",
              url: "http://example.com/questions2",
              size: "12MB",
              type: "application/pdf",
              title: "Questions",
              name: "Final Questions",
              date: new Date("2023-11-25T00:00:00.000Z"),
              icon: "pdf_icon.png",
              by: {
                userId: "2",
                firstName: "Jane",
                lastName: "Smith",
                phoneNumber: "987-654-3210",
                meta: {
                  grade: "B",
                  major: "Mathematics",
                },
                token: "def456",
              },
            },
          ],
          date: new Date("2023-12-10T00:00:00.000Z"),
        },
        {
          uid: "103",
          testId: "T3",
          title: "Quarterly Test",
          subject: 16, // biology
          total: 50,
          obtained: [40, 42, 38],
          users: "7,8,9",
          answers: [
            {
              _id: "A3",
              url: "http://example.com/answers3",
              size: "25MB",
              type: "application/pdf",
              title: "Answers",
              name: "Quarterly Answers",
              date: new Date("2023-03-01T00:00:00.000Z"),
              icon: "pdf_icon.png",
              by: {
                userId: "3",
                firstName: "Alice",
                lastName: "Johnson",
                phoneNumber: "555-666-7777",
                meta: {
                  grade: "A",
                  major: "Physics",
                },
                token: "ghi789",
              },
            },
          ],
          questions: [
            {
              _id: "Q3",
              url: "http://example.com/questions3",
              size: "18MB",
              type: "application/pdf",
              title: "Questions",
              name: "Quarterly Questions",
              date: new Date("2023-02-25T00:00:00.000Z"),
              icon: "pdf_icon.png",
              by: {
                userId: "3",
                firstName: "Alice",
                lastName: "Johnson",
                phoneNumber: "555-666-7777",
                meta: {
                  grade: "A",
                  major: "Physics",
                },
                token: "ghi789",
              },
            },
          ],
          date: new Date("2023-03-10T00:00:00.000Z"),
        },
        {
          uid: "104",
          testId: "T4",
          title: "Yearly Exam",
          subject: 10, // economics
          total: 150,
          obtained: [120, 110, 125],
          users: "10,1,2",
          answers: [
            {
              _id: "A4",
              url: "http://example.com/answers4",
              size: "30MB",
              type: "application/pdf",
              title: "Answers",
              name: "Yearly Answers",
              date: new Date("2023-08-01T00:00:00.000Z"),
              icon: "pdf_icon.png",
              by: {
                userId: "4",
                firstName: "Bob",
                lastName: "Williams",
                phoneNumber: "222-333-4444",
                meta: {
                  grade: "C",
                  major: "Chemistry",
                },
                token: "jkl012",
              },
            },
          ],
          questions: [
            {
              _id: "Q4",
              url: "http://example.com/questions4",
              size: "22MB",
              type: "application/pdf",
              title: "Questions",
              name: "Yearly Questions",
              date: new Date("2023-07-25T00:00:00.000Z"),
              icon: "pdf_icon.png",
              by: {
                userId: "4",
                firstName: "Bob",
                lastName: "Williams",
                phoneNumber: "222-333-4444",
                meta: {
                  grade: "C",
                  major: "Chemistry",
                },
                token: "jkl012",
              },
            },
          ],
          date: new Date("2023-08-10T00:00:00.000Z"),
        },
      ],
    };

    allScoresProvider.initial = false;
    allScoresProvider.data = data;
  },
};
