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

export const assignmentsProvider: Provider<{ assignments: Assignment[] }> = {
  data: { assignments: [] },
  initial: true,
  async load() {
    type Status = "rejected" | "accepted" | undefined;
    const data: { assignments: Assignment[] } = assignmentsProvider.data
      .assignments.length
      ? assignmentsProvider.data
      : {
          assignments: [
            {
              _id: "1",
              uid: "AS12345",
              title: "Math Assignment",
              subject: 19,
              files: generateFiles(),
              description:
                "<p>Solve the following math problems:</p>\n                        <ol>\n                          <li>Simplify the expression: ( (2x + 3)(x - 4) )</li>\n                          <li>Find the derivative of ( f(x) = x^3 + 2x^2 - x + 5 )</li>\n                          <li>Integrate the function: ( int (3x^2 - 4x + 1) , dx )</li>\n                          <li>Solve the equation: ( 2x^2 - 3x + 1 = 0 )</li>\n                        </ol>",
              by: {
                userId: "123",
                firstName: "John",
                lastName: "Doe",
                phoneNumber: "1234567890",
                meta: {},
                token: "abc123",
              },
              date: {
                start: new Date("2024-05-01T00:00:00.000Z"),
                end: new Date("2024-05-15T00:00:00.000Z"),
              },
            },
            {
              _id: "2",
              uid: "AS12346",
              title: "Photosynthesis Report",
              subject: 17,
              files: generateFiles(),
              description:
                "<p>Write a detailed report on the process of photosynthesis. Your report should include the following sections:</p>\n                        <ol>\n                          <li><strong>Introduction:</strong>\n                            <p>Define photosynthesis and explain its importance for plants and other organisms.</p>\n                          </li>\n                          <l><strong>Process:</strong>\n                            <p>Describe the stages of photosynthesis, including the light-dependennew Date(t and light-independennew Date(t reactions.)</p>\n                          </l)i>\n                          <li><strong>Factors Affecting Photosynthesis:</strong>\n                            <p>Discuss the various factors that can influence the rate of photosynthesis, such as light intensity, carbon dioxide concentration, and temperature.</p>\n                          </li>\n                          <li><strong>Conclusion:</strong>\n                            <p>Summarize the key points and explain the significance of photosynthesis in the global ecosystem.</p>\n                          </li>\n                        </ol>",
              by: {
                userId: "456",
                firstName: "Jane",
                lastName: "Smith",
                phoneNumber: "9876543210",
                meta: {},
                token: "def456",
              },
              date: {
                start: new Date("2024-05-10T00:00:00.000Z"),
                end: new Date("2024-05-20T00:00:00.000Z"),
              },
            },
            {
              _id: "3",
              uid: "AS12347",
              title: "World War II Essay",
              subject: 1,
              files: generateFiles(),
              description:
                "<p>Write an essay on World War II, covering the following points:</p>\n                        <ol>\n                          <li><strong>Causes:</strong>\n                            <p>Explain the main causes of World War II, including political, economic, and social factors.</p>\n                          </li>\n                          <li><strong>Major Events:</strong>\n                            <p>Describe the key events of the war, such as the invasion of Poland, the Battle of Britain, Pearl Harbor, and D-Day.</p>\n                          </li>\n                          <li><strong>Impact:</strong>\n                            <p>Discuss the impact of World War II on various countries and the global order.</p>\n                          </li>\n                          <li><strong>Conclusion:</strong>\n                            <p>Provide a summary of the essay and reflect on the lessons learned from World War II.</p>\n                          </li>\n                        </ol>",
              by: {
                userId: "789",
                firstName: "Alice",
                lastName: "Johnson",
                phoneNumber: "5555555555",
                meta: {},
                token: "ghi789",
              },
              date: {
                start: new Date("2024-05-05T00:00:00.000Z"),
                end: new Date("2024-05-25T00:00:00.000Z"),
              },
            },
            {
              _id: "4",
              uid: "AS12348",
              title: "Hamlet Analysis",
              subject: 3,
              files: generateFiles(),
              description:
                "<p>Analyze Shakespeare's play <em>Hamlet</em>. Your analysis should cover the following aspects:</p>\n                        <ol>\n                          <li><strong>Plot Summary:</strong>\n                            <p>Provide a brief summary of the plot, highlighting the key events.</p>\n                          </li>\n                          <li><strong>Character Analysis:</strong>\n                            <p>Analyze the main characters, including Hamlet, Claudius, Gertrude, and Ophelia. Discuss their motivations and relationships.</p>\n                          </li>\n                          <li><strong>Themes:</strong>\n                            <p>Identify and discuss the major themes of the play, such as revenge, madness, and mortality.</p>\n                          </li>\n                          <li><strong>Symbolism:</strong>\n                            <p>Examine the use of symbolism in the play, including significant objects, actions, and settings.</p>\n                          </li>\n                        </ol>",
              by: {
                userId: "101112",
                firstName: "Bob",
                lastName: "Williams",
                phoneNumber: "9998887777",
                meta: {},
                token: "jkl101112",
              },
              date: {
                start: new Date("2024-05-15T00:00:00.000Z"),
                end: new Date("2024-05-30T00:00:00.000Z"),
              },
            },
            {
              _id: "5",
              uid: "AS12349",
              title: "Newton's Laws Problems",
              subject: 15,
              files: generateFiles(),
              description:
                "<p>\n                          Solve the following problems using Newton's Laws of Motion. Show all your work and explain each step clearly.\n                        </p>\n                        <ol>\n                          <li>\n                            <strong>First Law (Law of Inertia):</strong>\n                            <p>\n                              An object is moving in a straight line with a constant velocity of 5 m/s. No external force is acting on it. What will be the object's velocity after 10 seconds? Explain why, using Newton's First Law.\n                            </p>\n                          </li>\n                          <li>\n                            <strong>Second Law (Law of Acceleration):</strong>\n                            <p>\n                              A 10 kg object is subjected to a force of 50 N. Calculate the acceleration of the object. Then, determine the velocity of the object after 5 seconds if it startednew Date( from rest.\n                            </p>\n)                          </li>\n                          <li>\n                            <strong>Third Law (Action and Reaction):</strong>\n                            <p>\n                              A person pushes against a wall with a force of 30 N. What is the force exerted by the wall on the person? Explain your answer using Newton's Third Law.\n                            </p>\n                          </li>\n                          <li>\n                            <strong>Combined Laws:</strong>\n                            <p>\n                              A 5 kg object is at rest on a frictionless surface. A horizontal force of 20 N is applied to the object. Calculate the acceleration and the distance traveled by the object in 4 seconds.\n                            </p>\n                          </li>\n                        </ol>",
              by: {
                userId: "131415",
                firstName: "Eva",
                lastName: "Brown",
                phoneNumber: "3332221111",
                meta: {},
                token: "mno131415",
              },
              date: {
                start: new Date("2024-05-20T00:00:00.000Z"),
                end: new Date("2024-06-05T00:00:00.000Z"),
              },
            },
            {
              _id: "6",
              uid: "AS12350",
              title: "Balancing Chemical Equations",
              subject: 16,
              files: generateFiles(),
              description:
                "<p>Balance the following chemical equations:</p>\n                        <ol>\n                          <li>H<sub>2</sub> + O<sub>2</sub> → H<sub>2</sub>O</li>\n                          <li>CH<sub>4</sub> + O<sub>2</sub> → CO<sub>2</sub> + H<sub>2</sub>O</li>\n                          <li>Fe + O<sub>2</sub> → Fe<sub>2</sub>O<sub>3</sub></li>\n                          <li>Na + Cl<sub>2</sub> → NaCl</li>\n                        </ol>\n                        <p>Show all your work and explain the steps taken to balance each equation.</p>",
              by: {
                userId: "161718",
                firstName: "Mike",
                lastName: "Davis",
                phoneNumber: "4443332222",
                meta: {},
                token: "pqr161718",
              },
              date: {
                start: new Date("2024-05-25T00:00:00.000Z"),
                end: new Date("2024-06-10T00:00:00.000Z"),
              },
            },
            {
              _id: "7",
              uid: "AS12351",
              title: "Geography Mapping",
              subject: 12,
              files: generateFiles(),
              description:
                "<p>Create a map that includes the following features:</p>\n                        <ol>\n                          <li>All continents and their respective countries.</li>\n                          <li>Major oceans and seas.</li>\n                          <li>Significant mountain ranges and rivers.</li>\n                          <li>Important cities and landmarks.</li>\n                        </ol>\n                        <p>Ensure your map is labeled clearly and accurately. Use color to differentiate between different geographical features.</p>",
              by: {
                userId: "192021",
                firstName: "Sara",
                lastName: "Wilson",
                phoneNumber: "7776665555",
                meta: {},
                token: "stu192021",
              },
              date: {
                start: new Date("2024-05-30T00:00:00.000Z"),
                end: new Date("2024-06-15T00:00:00.000Z"),
              },
            },
            {
              _id: "8",
              uid: "AS12352",
              title: "Fibonacci Sequence Program",
              subject: 20,
              files: generateFiles(),
              description:
                "<p>Write a program that calculates the Fibonacci sequence up to the 20th term. Your program should:</p>\n                        <ol>\n                          <li>Prompt the user for the number of terms to generate.</li>\n                          <li>Calculate each term in the sequence using a loop or recursion.</li>\n                          <li>Output the sequence to the user.</li>\n                          <li>Include comments explaining the logic of your code.</li>\n                        </ol>",
              by: {
                userId: "222324",
                firstName: "Chris",
                lastName: "Taylor",
                phoneNumber: "2223334444",
                meta: {},
                token: "vwx222324",
              },
              date: {
                start: new Date("2024-06-01T00:00:00.000Z"),
                end: new Date("2024-06-20T00:00:00.000Z"),
              },
            },
            {
              _id: "9",
              uid: "AS12353",
              title: "Nature-Inspired Painting",
              subject: 6,
              files: generateFiles(),
              description:
                "<p>Create a painting inspired by nature. Your painting should:</p>\n                        <ol>\n                          <li>Depict a natural scene such as a forest, mountain, or ocean.</li>\n                          <li>Use a variety of colors to capture the beauty of the scene.</li>\n                          <li>Include details that show your observation of nature, such as specific plants, animals, or weather conditions.</li>\n                          <li>Write a short description of your painting and the inspiration behind it.</li>\n                        </ol>",
              by: {
                userId: "252627",
                firstName: "Lily",
                lastName: "Martinez",
                phoneNumber: "1112223333",
                meta: {},
                token: "yza252627",
              },
              date: {
                start: new Date("2024-06-05T00:00:00.000Z"),
                end: new Date("2024-06-25T00:00:00.000Z"),
              },
            },
            {
              _id: "10",
              uid: "AS12354",
              title: "Piano Composition",
              subject: 6,
              files: generateFiles(),
              description:
                "<p>Compose a piece of music for the piano. Your composition should:</p>\n                        <ol>\n                          <li>Be at least 2 minutes long.</li>\n                          <li>Include a variety of musical elements such as melody, harmony, and rhythm.</li>\n                          <li>Be written in standard musical notation.</li>\n                          <li>Include a title and a short description of the piece.</li>\n                        </ol>",
              by: {
                userId: "282930",
                firstName: "Tom",
                lastName: "Clark",
                phoneNumber: "6667778888",
                meta: {},
                token: "bcd282930",
              },
              date: {
                start: new Date("2024-06-10T00:00:00.000Z"),
                end: new Date("2024-06-30T00:00:00.000Z"),
              },
            },
          ],
        };

    assignmentsProvider.initial = false;
    assignmentsProvider.data = data;
  },
};
