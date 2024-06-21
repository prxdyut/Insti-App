const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateFiles = (): _File[] => {
  const fileTypes = ["jpg", "png", "pdf", "doc"];
  const files: _File[] = [];
  const numFiles = getRandomInt(3, 10);

  let hasJpgPng = false;
  let hasPdfDoc = false;

  for (let i = 0; i < numFiles; i++) {
    const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    const url =
      fileType === "jpg" || fileType === "png"
        ? `https://picsum.photos/2000?id=${i}`
        : `https://example.com/${fileType}`;

    const file: _File = {
      _id: `file_${i + 1}`,
      url,
      size: `${getRandomInt(500, 2000)}KB`,
      type: fileType,
      title: `${fileType.toUpperCase()} File`,
      name: `file_${i + 1}.${fileType}`,
      date: new Date(),
      by: {
        userId: "randomUserId",
        firstName: "Random",
        lastName: "User",
        phoneNumber: "1234567890",
        meta: {},
        token: "randomToken",
      },
    };

    files.push(file);

    if (fileType === "jpg" || fileType === "png") {
      hasJpgPng = true;
    } else if (fileType === "pdf" || fileType === "doc") {
      hasPdfDoc = true;
    }
  }

  // Ensure each assignment has at least one jpg/png and one pdf/doc
  if (!hasJpgPng) {
    const jpgFile: _File = {
      _id: `file_${numFiles + 1}`,
      url: `https://picsum.photos/${Math.round(Math.random() * 10000)}`,
      size: `${getRandomInt(500, 2000)}KB`,
      type: "jpg",
      title: `JPG File`,
      name: `file_${numFiles + 1}.jpg`,
      date: new Date(),
      by: {
        userId: "randomUserId",
        firstName: "Random",
        lastName: "User",
        phoneNumber: "1234567890",
        meta: {},
        token: "randomToken",
      },
    };
    files.push(jpgFile);
  }

  if (!hasPdfDoc) {
    const pdfFile: _File = {
      _id: `file_${numFiles + 2}`,
      url: `https://example.com/pdf`,
      size: `${getRandomInt(500, 2000)}KB`,
      type: "pdf",
      title: `PDF File`,
      name: `file_${numFiles + 2}.pdf`,
      date: new Date(),
      by: {
        userId: "randomUserId",
        firstName: "Random",
        lastName: "User",
        phoneNumber: "1234567890",
        meta: {},
        token: "randomToken",
      },
    };
    files.push(pdfFile);
  }

  return files;
};

export const submissionsProvider: Provider<{ submissions: Submission[] }> = {
  data: { submissions: [] },
  initial: true,
  async load() {
    const data: { submissions: Submission[] } = {
      submissions: [
        {
          _id: "S11U6",
          by: {
            userId: "U6",
            firstName: "David",
            lastName: "Clark",
            phoneNumber: "111-222-3333",
            meta: { grade: "A", major: "Engineering" },
            token: "pqr678",
          },
          assignmentId: "AS12345",
          date: {
            created: new Date("2023-06-11T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12345 by David Clark",
          files: [
            {
              _id: "11",
              url: "http://example.com/Engineering_Diagrams.pdf",
              size: "2.0MB",
              type: "application/pdf",
              title: "Engineering Diagrams",
              name: "Engineering_Diagrams.pdf",
              date: new Date("2023-06-11T00:00:00.000Z"),
              icon: "image",
              by: { firstName: "Ms. Taylor" },
            },
          ],
          remark: "Excellent work!",
          status: "accepted",
        },
        {
          _id: "S12U7",
          by: {
            userId: "U7",
            firstName: "Emily",
            lastName: "Evans",
            phoneNumber: "222-333-4444",
            meta: { grade: "B", major: "Law" },
            token: "stu901",
          },
          assignmentId: "AS12346",
          date: {
            created: new Date("2023-06-12T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12346 by Emily Evans",
          files: [
            {
              _id: "12",
              url: "http://example.com/Law_Case_Studies.docx",
              size: "1.5MB",
              type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              title: "Law Case Studies",
              name: "Law_Case_Studies.docx",
              date: new Date("2023-06-12T00:00:00.000Z"),
              icon: "picture_as_pdf",
              by: { firstName: "Mr. Taylor" },
            },
          ],
          remark: undefined,
          status: "rejected",
        },
        {
          _id: "S13U8",
          by: {
            userId: "U8",
            firstName: "Fiona",
            lastName: "Green",
            phoneNumber: "333-444-5555",
            meta: { grade: "A", major: "Literature" },
            token: "vwx234",
          },
          assignmentId: "AS12347",
          date: {
            created: new Date("2023-06-13T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12347 by Fiona Green",
          files: [
            {
              _id: "13",
              url: "http://example.com/Literature_Analysis.pdf",
              size: "1.8MB",
              type: "application/pdf",
              title: "Literature Analysis",
              name: "Literature_Analysis.pdf",
              date: new Date("2023-06-13T00:00:00.000Z"),
              icon: "image",
              by: { firstName: "Ms. Brown" },
            },
          ],
          remark: "Insightful analysis!",
          status: "accepted",
        },
        {
          _id: "S14U9",
          by: {
            userId: "U9",
            firstName: "George",
            lastName: "White",
            phoneNumber: "444-555-6666",
            meta: { grade: "B", major: "History" },
            token: "yz0123",
          },
          assignmentId: "AS12348",
          date: {
            created: new Date("2023-06-14T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12348 by George White",
          files: [
            {
              _id: "14",
              url: "http://example.com/History_Research_Paper.docx",
              size: "2.3MB",
              type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              title: "History Research Paper",
              name: "History_Research_Paper.docx",
              date: new Date("2023-06-14T00:00:00.000Z"),
              icon: "folder_zip",
              by: { firstName: "Mr. White" },
            },
          ],
          remark: undefined,
          status: "rejected",
        },
        {
          _id: "S15U10",
          by: {
            userId: "U10",
            firstName: "Hannah",
            lastName: "Black",
            phoneNumber: "555-666-7777",
            meta: { grade: "A", major: "Psychology" },
            token: "abc345",
          },
          assignmentId: "AS12349",
          date: {
            created: new Date("2023-06-15T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12349 by Hannah Black",
          files: [
            {
              _id: "15",
              url: "http://example.com/Psychology_Experiment_Report.pdf",
              size: "1.1MB",
              type: "application/pdf",
              title: "Psychology Experiment Report",
              name: "Psychology_Experiment_Report.pdf",
              date: new Date("2023-06-15T00:00:00.000Z"),
              icon: "folder_zip",
              by: { firstName: "Ms. White" },
            },
          ],
          remark: "Great work!",
          status: "accepted",
        },
        {
          _id: "S16U6",
          by: {
            userId: "U6",
            firstName: "David",
            lastName: "Clark",
            phoneNumber: "111-222-3333",
            meta: { grade: "A", major: "Engineering" },
            token: "pqr678",
          },
          assignmentId: "AS12350",
          date: {
            created: new Date("2023-06-16T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12350 by David Clark",
          files: [
            {
              _id: "16",
              url: "http://example.com/CAD_Design_Project.pdf",
              size: "3.0MB",
              type: "application/pdf",
              title: "CAD Design Project",
              name: "CAD_Design_Project.pdf",
              date: new Date("2023-06-16T00:00:00.000Z"),
              icon: "picture_as_pdf",
              by: { firstName: "Mr. Green" },
            },
          ],
          remark: undefined,
          status: "rejected",
        },
        {
          _id: "S17U7",
          by: {
            userId: "U7",
            firstName: "Emily",
            lastName: "Evans",
            phoneNumber: "222-333-4444",
            meta: { grade: "B", major: "Law" },
            token: "stu901",
          },
          assignmentId: "AS12351",
          date: {
            created: new Date("2023-06-17T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12351 by Emily Evans",
          files: [
            {
              _id: "17",
              url: "http://example.com/Legal_Essays.docx",
              size: "2.5MB",
              type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              title: "Legal Essays",
              name: "Legal_Essays.docx",
              date: new Date("2023-06-17T00:00:00.000Z"),
              icon: "description",
              by: { firstName: "Ms. Green" },
            },
          ],
          remark: "Well written!",
          status: "accepted",
        },
        {
          _id: "S18U8",
          by: {
            userId: "U8",
            firstName: "Fiona",
            lastName: "Green",
            phoneNumber: "333-444-5555",
            meta: { grade: "A", major: "Literature" },
            token: "vwx234",
          },
          assignmentId: "AS12352",
          date: {
            created: new Date("2023-06-18T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12352 by Fiona Green",
          files: [
            {
              _id: "18",
              url: "http://example.com/Poetry_Analysis.pdf",
              size: "1.9MB",
              type: "application/pdf",
              title: "Poetry Analysis",
              name: "Poetry_Analysis.pdf",
              date: new Date("2023-06-18T00:00:00.000Z"),
              icon: "image",
              by: { firstName: "Mr. Brown" },
            },
          ],
          remark: undefined,
          status: "rejected",
        },
        {
          _id: "S19U9",
          by: {
            userId: "U9",
            firstName: "George",
            lastName: "White",
            phoneNumber: "444-555-6666",
            meta: { grade: "B", major: "History" },
            token: "yz0123",
          },
          assignmentId: "AS12353",
          date: {
            created: new Date("2023-06-19T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12353 by George White",
          files: [
            {
              _id: "19",
              url: "http://example.com/Historical_Documents.pdf",
              size: "2.2MB",
              type: "application/pdf",
              title: "Historical Documents",
              name: "Historical_Documents.pdf",
              date: new Date("2023-06-19T00:00:00.000Z"),
              icon: "folder_zip",
              by: { firstName: "Ms. Taylor" },
            },
          ],
          remark: "Interesting content!",
          status: "accepted",
        },
        {
          _id: "S20U10",
          by: {
            userId: "U10",
            firstName: "Hannah",
            lastName: "Black",
            phoneNumber: "555-666-7777",
            meta: { grade: "A", major: "Psychology" },
            token: "abc345",
          },
          assignmentId: "AS12354",
          date: {
            created: new Date("2023-06-20T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12354 by Hannah Black",
          files: [
            {
              _id: "20",
              url: "http://example.com/Cognitive_Behavioral_Therapy.pdf",
              size: "1.4MB",
              type: "application/pdf",
              title: "Cognitive Behavioral Therapy",
              name: "Cognitive_Behavioral_Therapy.pdf",
              date: new Date("2023-06-20T00:00:00.000Z"),
              icon: "picture_as_pdf",
              by: { firstName: "Ms. Evans" },
            },
          ],
          remark: undefined,
          status: "rejected",
        },
        {
          _id: "S1U1",
          by: {
            userId: "U1",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "123-456-7890",
            meta: { grade: "A", major: "Biology" },
            token: "abc123",
          },
          assignmentId: "AS12345",
          date: {
            created: new Date("2023-06-01T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12345 by John Doe",
          files: [
            {
              _id: "1",
              url: "http://example.com/Biology_Notes_Chapter1.pdf",
              size: "1.2MB",
              type: "application/pdf",
              title: "Biology Notes",
              name: "Biology_Notes_Chapter1.pdf",
              date: new Date("2023-06-01T00:00:00.000Z"),
              icon: "image",
              by: { firstName: "Ms. Thompson" },
            },
          ],
          remark: "Well done!",
          status: "accepted",
        },
        {
          _id: "S2U2",
          by: {
            userId: "U2",
            firstName: "Jane",
            lastName: "Smith",
            phoneNumber: "987-654-3210",
            meta: { grade: "B", major: "Physics" },
            token: "def456",
          },
          assignmentId: "AS12346",
          date: {
            created: new Date("2023-06-02T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12346 by Jane Smith",
          files: [
            {
              _id: "2",
              url: "http://example.com/Algebra_Workbook_Exercises.docx",
              size: "850KB",
              type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              title: "Algebra Workbook",
              name: "Algebra_Workbook_Exercises.docx",
              date: new Date("2023-06-02T00:00:00.000Z"),
              icon: "picture_as_pdf",
              by: { firstName: "Mr. Adams" },
            },
          ],
          remark: undefined,
          status: "rejected",
        },
        {
          _id: "S3U3",
          by: {
            userId: "U3",
            firstName: "Alice",
            lastName: "Johnson",
            phoneNumber: "456-789-1234",
            meta: { grade: "A", major: "Mathematics" },
            token: "ghi789",
          },
          assignmentId: "AS12347",
          date: {
            created: new Date("2023-06-03T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12347 by Alice Johnson",
          files: [
            {
              _id: "3",
              url: "http://example.com/World_History_Timeline.pptx",
              size: "2.5MB",
              type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              title: "World History Timeline",
              name: "World_History_Timeline.pptx",
              date: new Date("2023-06-03T00:00:00.000Z"),
              icon: "image",
              by: { firstName: "Mr. Brown" },
            },
          ],
          remark: "Well done!",
          status: "accepted",
        },
        {
          _id: "S4U4",
          by: {
            userId: "U4",
            firstName: "Bob",
            lastName: "Brown",
            phoneNumber: "789-123-4567",
            meta: { grade: "B", major: "Chemistry" },
            token: "jkl012",
          },
          assignmentId: "AS12348",
          date: {
            created: new Date("2023-06-04T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12348 by Bob Brown",
          files: [
            {
              _id: "4",
              url: "http://example.com/Chemistry_Lab_Report_Template.docx",
              size: "400KB",
              type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              title: "Chemistry Lab Report",
              name: "Chemistry_Lab_Report_Template.docx",
              date: new Date("2023-06-04T00:00:00.000Z"),
              icon: "folder_zip",
              by: { firstName: "Ms. Garcia" },
            },
          ],
          remark: undefined,
          status: "rejected",
        },
        {
          _id: "S5U5",
          by: {
            userId: "U5",
            firstName: "Charlie",
            lastName: "Davis",
            phoneNumber: "321-654-9870",
            meta: { grade: "A", major: "Computer Science" },
            token: "mno345",
          },
          assignmentId: "AS12349",
          date: {
            created: new Date("2023-06-05T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12349 by Charlie Davis",
          files: [
            {
              _id: "5",
              url: "http://example.com/Literature_Reading_List_Semester1.pdf",
              size: "200KB",
              type: "application/pdf",
              title: "Literature Reading List",
              name: "Literature_Reading_List_Semester1.pdf",
              date: new Date("2023-06-05T00:00:00.000Z"),
              icon: "folder_zip",
              by: { firstName: "Mrs. Davis" },
            },
          ],
          remark: "Well done!",
          status: "accepted",
        },
        {
          _id: "S6U1",
          by: {
            userId: "U1",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "123-456-7890",
            meta: { grade: "A", major: "Biology" },
            token: "abc123",
          },
          assignmentId: "AS12350",
          date: {
            created: new Date("2023-06-06T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12350 by John Doe",
          files: [
            {
              _id: "6",
              url: "http://example.com/Geometry_Practice_Problems.pdf",
              size: "1.0MB",
              type: "application/pdf",
              title: "Geometry Practice Problems",
              name: "Geometry_Practice_Problems.pdf",
              date: new Date("2023-06-06T00:00:00.000Z"),
              icon: "picture_as_pdf",
              by: { firstName: "Mr. Harris" },
            },
          ],
          remark: undefined,
          status: "rejected",
        },
        {
          _id: "S7U2",
          by: {
            userId: "U2",
            firstName: "Jane",
            lastName: "Smith",
            phoneNumber: "987-654-3210",
            meta: { grade: "B", major: "Physics" },
            token: "def456",
          },
          assignmentId: "AS12351",
          date: {
            created: new Date("2023-06-07T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12351 by Jane Smith",
          files: [
            {
              _id: "7",
              url: "http://example.com/Physics_Equations_Sheet.pdf",
              size: "150KB",
              type: "application/pdf",
              title: "Physics Equations Sheet",
              name: "Physics_Equations_Sheet.pdf",
              date: new Date("2023-06-07T00:00:00.000Z"),
              icon: "description",
              by: { firstName: "Ms. Lee" },
            },
          ],
          remark: "Well done!",
          status: "accepted",
        },
        {
          _id: "S8U3",
          by: {
            userId: "U3",
            firstName: "Alice",
            lastName: "Johnson",
            phoneNumber: "456-789-1234",
            meta: { grade: "A", major: "Mathematics" },
            token: "ghi789",
          },
          assignmentId: "AS12352",
          date: {
            created: new Date("2023-06-08T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12352 by Alice Johnson",
          files: [
            {
              _id: "8",
              url: "http://example.com/Spanish_Vocabulary_List.docx",
              size: "300KB",
              type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              title: "Spanish Vocabulary List",
              name: "Spanish_Vocabulary_List.docx",
              date: new Date("2023-06-08T00:00:00.000Z"),
              icon: "description",
              by: { firstName: "Mr. Martinez" },
            },
          ],
          remark: undefined,
          status: "rejected",
        },
        {
          _id: "S9U4",
          by: {
            userId: "U4",
            firstName: "Bob",
            lastName: "Brown",
            phoneNumber: "789-123-4567",
            meta: { grade: "B", major: "Chemistry" },
            token: "jkl012",
          },
          assignmentId: "AS12353",
          date: {
            created: new Date("2023-06-09T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12353 by Bob Brown",
          files: [
            {
              _id: "9",
              url: "http://example.com/Art_History_Essay_Guidelines.pdf",
              size: "500KB",
              type: "application/pdf",
              title: "Art History Essay Guidelines",
              name: "Art_History_Essay_Guidelines.pdf",
              date: new Date("2023-06-09T00:00:00.000Z"),
              icon: "folder_zip",
              by: { firstName: "Mrs. Robinson" },
            },
          ],
          remark: "Well done!",
          status: "accepted",
        },
        {
          _id: "S10U5",
          by: {
            userId: "U5",
            firstName: "Charlie",
            lastName: "Davis",
            phoneNumber: "321-654-9870",
            meta: { grade: "A", major: "Computer Science" },
            token: "mno345",
          },
          assignmentId: "AS12354",
          date: {
            created: new Date("2023-06-10T00:00:00.000Z"),
          },
          description: "Submission for assignment AS12354 by Charlie Davis",
          files: [
            {
              _id: "10",
              url: "http://example.com/Computer_Science_Project_Outline.pptx",
              size: "1.8MB",
              type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              title: "Computer Science Project Outline",
              name: "Computer_Science_Project_Outline.pptx",
              date: new Date("2023-06-10T00:00:00.000Z"),
              icon: "image",
              by: { firstName: "Mr. Evans" },
            },
          ],
          remark: undefined,
          status: "rejected",
        },
      ],
    };

    submissionsProvider.initial = false;
    submissionsProvider.data = data;
  },
};
