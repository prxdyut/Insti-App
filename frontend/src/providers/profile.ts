import { del, get, set, update } from "idb-keyval";
import subjects from "../utils/subjects";

export const profileProvider: Provider<{
  info: ProfileInfoRef;
  files: ProfileFile[];
  badges: ProfileBadgeRef[];
}> = {
  data: { info: {}, files: [], badges: [] },
  initial: true,
  async load() {
    const data: {
      info: ProfileInfoRef;
      files: ProfileFile[];
      badges: ProfileBadgeRef[];
    } = {
      info: {
        uid: "STU1234567890",
        firstName: "Amit",
        lastName: "Kumar",
        class: "X",
        division: "C",
        rollNo: "15",
        eMail: "amitkumar@example.com",
        phoneNo: "+91 98765 43210",
      },
      badges: [
        {
          id: 1,
          date: new Date("2024-06-14"),
          title: "Best Student",
          description: "Awarded for outstanding performance",
        },
        {
          id: 2,
          date: new Date("2024-06-14"),
          title: "Creative Genius",
          description: "Recognized for exceptional creativity",
        },
        {
          id: 3,
          date: new Date("2024-06-14"),
          title: "Intuitive Thinker",
          description: "Honored for intuitive problem-solving skills",
        },
        {
          id: 4,
          date: new Date("2024-06-14"),
          title: "Outstanding Leader",
          description: "Awarded for exceptional leadership qualities",
        },
        {
          id: 5,
          date: new Date("2024-06-14"),
          title: "Academic Excellence",
          description: "Recognized for achieving academic excellence",
        },
        {
          id: 6,
          date: new Date("2024-06-14"),
          title: "Sports Champion",
          description: "Honored for outstanding achievements in sports",
        },
        {
          id: 7,
          date: new Date("2024-06-14"),
          title: "Community Helper",
          description: "Awarded for significant contributions to the community",
        },
      ],
      files: [
        {
          title: "Biology Notes",
          name: "Biology_Notes_Chapter1.pdf",
          date: new Date("2024-06-01"),
          size: "1.2MB",
          icon: "grid_on",
        },
        {
          title: "Algebra Workbook",
          name: "Algebra_Workbook_Exercises.docx",
          date: new Date("2024-05-28"),
          size: "850KB",
          icon: "grid_on",
        },
        {
          title: "World History Timeline",
          name: "World_History_Timeline.pptx",
          date: new Date("2024-06-05"),
          size: "2.5MB",
          icon: "picture_as_pdf",
        },
        {
          title: "Chemistry Lab Report",
          name: "Chemistry_Lab_Report_Template.docx",
          date: new Date("2024-05-30"),
          size: "400KB",
          icon: "picture_as_pdf",
        },
        {
          title: "Literature Reading List",
          name: "Literature_Reading_List_Semester1.pdf",
          date: new Date("2024-05-20"),
          size: "200KB",
          icon: "folder_zip",
        },
        {
          title: "Geometry Practice Problems",
          name: "Geometry_Practice_Problems.pdf",
          date: new Date("2024-06-02"),
          size: "1.0MB",
          icon: "insert_drive_file",
        },
        {
          title: "Physics Equations Sheet",
          name: "Physics_Equations_Sheet.pdf",
          date: new Date("2024-05-25"),
          size: "150KB",
          icon: "image",
        },
        {
          title: "Spanish Vocabulary List",
          name: "Spanish_Vocabulary_List.docx",
          date: new Date("2024-05-27"),
          size: "300KB",
          icon: "picture_as_pdf",
        },
        {
          title: "Art History Essay Guidelines",
          name: "Art_History_Essay_Guidelines.pdf",
          date: new Date("2024-05-22"),
          size: "500KB",
          icon: "insert_drive_file",
        },
        {
          title: "Computer Science Project Outline",
          name: "Computer_Science_Project_Outline.pptx",
          date: new Date("2024-06-04"),
          size: "1.8MB",
          icon: "picture_as_pdf",
        },
      ],
    };

    profileProvider.initial = false;
    profileProvider.data = data;
  },
};
