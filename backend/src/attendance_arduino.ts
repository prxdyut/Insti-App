import { Hono } from "hono";
import { format } from "date-fns";

const app = new Hono();

// Data structures
interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  cardUID: string;
}

interface AttendanceLog {
  uid: string;
  timestamp: string;
}

interface NewCard {
  uid: string;
  timestamp: string;
}

interface DeviceLog {
  timestamp: string;
  type: "on" | "off" | "in" | "out";
}

let students: Student[] = [];
let attendanceLogs: AttendanceLog[] = [];
let newCards: NewCard[] = [];
let deviceLogs: DeviceLog[] = [];

// Generate a simple unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// CSS styles
const styles = `
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
    body { display: flex; flex-direction: column; text-align: center; padding-top: 35vh; }
    h1, h2 { color: #333; }
    ul { list-style-type: none; padding: 0; }
    li { margin-bottom: 10px; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .button { display: inline-block; padding: 10px 15px; background-color: #0066cc; color: white; border-radius: 5px; text-decoration: none; width: fit-content; margin: auto; }
    .button:hover { background-color: #0052a3; }
    form { margin-top: 20px; }
    label { display: block; margin-bottom: 5px; }
    input[type="text"] { width: 25rem;; padding: 5px; margin-bottom: 10px; }
    button[type="submit"] { padding: 10px 15px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; }
    button[type="submit"]:hover { background-color: #45a049; }
  </style>
`;

// Home page
app.get("/", (c) => {
  return c.html(`
    ${styles}
    <h1>Attendance System</h1>
    <div>
      <a href="/api/device/attendance" class="button">Attendance Logs</a>
      <a href="/api/device/new" class="button">New Student</a>
      <a href="/api/device/students" class="button">All Students</a>
      <a href="/api/device/new-cards" class="button">New Cards</a>
      <a href="/api/device/logs" class="button">Device Logs</a>
    </div>
  `);
});

// Attendance logs page
app.get("/attendance", (c) => {
  const attendanceWithNames = attendanceLogs.map((log) => {
    const student = students.find((s) => s.cardUID === log.uid);
    return {
      name: student ? `${student.firstName} ${student.lastName}` : "Unknown",
      timestamp: format(new Date(log.timestamp), "MMMM d, yyyy h:mm a"),
    };
  });

  return c.html(`
    ${styles}
    <h1>Attendance Logs</h1>
    <ul>
      ${attendanceWithNames
        .map((log) => `<li>${log.name} - ${log.timestamp}</li>`)
        .join("")}
    </ul>
    <a href="/api/device" class="button">Back to Home</a>
  `);
});

// New student form
app.get("/new", (c) => {
  const cardUID = c.req.query("cardUID") || "";
  const readOnly = cardUID ? "readonly" : "";

  return c.html(`
    ${styles}
    <h1>Add New Student</h1>
    <form method="POST">
      <label>First Name: <input type="text" name="firstName" required></label>
      <label>Last Name: <input type="text" name="lastName" required></label>
      <label>Card UID: <input type="text" name="cardUID" value="${cardUID}" ${readOnly} required></label>
      <button type="submit">Add Student</button>
    </form>
    <a href="/api/device" class="button">Back to Home</a>
  `);
});

// Handle new student form submission
app.post("/new", async (c) => {
  const body = await c.req.parseBody();
  const newStudent: Student = {
    _id: generateId(),
    firstName: body.firstName as string,
    lastName: body.lastName as string,
    cardUID: body.cardUID as string,
  };
  students.push(newStudent);
  return c.redirect("/api/device/students");
});

// Edit student form
app.get("/edit/:id", (c) => {
  const id = c.req.param("id");
  const student = students.find((s) => s._id === id);

  if (!student) {
    return c.text("Student not found", 404);
  }

  return c.html(`
    ${styles}
    <h1>Edit Student</h1>
    <form method="POST">
      <input type="hidden" name="_id" value="${student._id}">
      <label>First Name: <input type="text" name="firstName" value="${student.firstName}" required></label>
      <label>Last Name: <input type="text" name="lastName" value="${student.lastName}" required></label>
      <label>Card UID: <input type="text" name="cardUID" value="${student.cardUID}" required></label>
      <button type="submit">Update Student</button>
    </form>
    <a href="/api/device/students" class="button">Back to Students</a>
  `);
});

// Handle edit student form submission
app.post("/edit/:id", async (c) => {
  const body = await c.req.parseBody();
  const id = c.req.param("id");
  const studentIndex = students.findIndex((s) => s._id === id);

  if (studentIndex === -1) {
    return c.text("Student not found", 404);
  }

  students[studentIndex] = {
    _id: id,
    firstName: body.firstName as string,
    lastName: body.lastName as string,
    cardUID: body.cardUID as string,
  };

  return c.redirect("/api/device/students");
});

// Delete student
app.post("/delete/:id", (c) => {
  const id = c.req.param("id");
  students = students.filter((s) => s._id !== id);
  return c.redirect("/api/device/students");
});

// Arduino endpoint
app.get("/punch", (c) => {
  const url = c.req.url;
  const params = new URL(url).searchParams;

  if (params.has("error")) return c.text("error", 200);

  const uids = params.get("uids") as string;
  const uid = params.get("uid") as string;
  const timestamps = params.get("timestamps") as string;
  const timestamp = params.get("timestamp") as string;
  const multiple = params.has("multiple");

  let scans: { uid: string; timestamp: string }[] = [];

  if (multiple) {
    const uidArray = uids.split(",");
    const timestampArray = timestamps.split(",");
    if (uidArray.length === timestampArray.length) {
      scans = uidArray.map((uid, index) => ({
        uid: uid.trim(),
        timestamp: timestampArray[index].trim(),
      }));
    } else {
      console.error("Mismatch in uids and timestamps array lengths");
    }
  } else if (uid && timestamp) {
    scans = [
      {
        uid: uid.trim(),
        timestamp: timestamp.trim(),
      },
    ];
  } else {
    console.error("Invalid parameters provided");
  }

  if (scans) {
    scans.map(({ uid, timestamp }) => {
      console.log("-- Message on Server --");
      console.log("New Scan Detected!!!");
      console.log("Card UID : " + uid);
      console.log("Date : " + format(new Date(timestamp), "MMMM d, yyyy"));
      console.log("Time : " + format(new Date(timestamp), "h:mm a"));

      if (students.some((s) => s.cardUID === uid)) {
        attendanceLogs.push({ uid, timestamp });
      } else {
        newCards.push({ uid, timestamp });
      }
    });

    console.log("-- Message on Server --");
  }

  return c.text("success", 200);
});

// New cards page
app.get("/new-cards", (c) => {
  return c.html(`
    ${styles}
    <h1>New Cards</h1>
    <ul>
      ${newCards
        .map(
          (card) => `
        <li>
          UID: ${card.uid} - Time: ${format(
            new Date(card.timestamp),
            "MMMM d, yyyy h:mm a"
          )}
          <a href="/api/device/new?cardUID=${
            card.uid
          }" class="button">Add as New Student</a>
        </li>
      `
        )
        .join("")}
    </ul>
    <a href="/api/device" class="button">Back to Home</a>
  `);
});

// All students page
app.get("/students", (c) => {
  return c.html(`
    ${styles}
    <h1>All Students</h1>
    <ul>
      ${students
        .map(
          (student) => `
        <li>
          ${student.firstName} ${student.lastName} (UID: ${student.cardUID})
          <a href="/api/device/edit/${student._id}" class="button">Edit</a>
          <form method="POST" action="/api/device/delete/${student._id}" style="display: inline;">
            <button type="submit" onclick="return confirm('Are you sure you want to delete this student?')">Delete</button>
          </form>
        </li>
      `
        )
        .join("")}
    </ul>
    <a href="/api/device" class="button">Back to Home</a>
  `);
});

// Device status endpoint
app.get("/status", (c) => {
  const timestamp = c.req.query("timestamp");
  const type = c.req.query("type") as "on" | "off" | "in" | "out";

  if (timestamp && type) {
    deviceLogs.push({ timestamp, type });
    return c.text("Status logged successfully", 200);
  }

  return c.text("Invalid parameters", 400);
});

// Device logs page
app.get("/logs", (c) => {
  return c.html(`
    ${styles}
    <h1>Device Logs</h1>
    <ul>
      ${deviceLogs
        .map(
          (log) => `
        <li>
          ${format(new Date(log.timestamp), "MMMM d, yyyy h:mm a")} - Device ${
            log.type
          }
        </li>
      `
        )
        .join("")}
    </ul>
    <a href="/api/device" class="button">Back to Home</a>
  `);
});

export default app;
