import {
  LoaderFunctionArgs,
  RouteObject,
  createBrowserRouter,
} from "react-router-dom";
import MAIN from "../routes/page";
import {
  ASSIGNMENT_SLUG,
  ALERT_SLUG,
  SCHEDULE_SLUG,
  SCORES_SLUG,
  DOUBTS_SLUG,
  ATTENDANCE_SLUG,
  ACCOUNT_SLUG,
  SETTINGS_SLUG,
  REPORT_SLUG,
  LOGIN_SLUG,
  RESET_SLUG,
  PERFORMANCE_SLUG,
  RESOURCES_SLUG,
} from "./slugs";
import { loginAction } from "../actions/login";
import { loginLoader } from "../loaders/login";
import LoginPage from "../routes/LoginPage";
import { authProvider } from "../providers/auth";
import Layout from "../routes/Layout";
import AssignmentsHomepage from "../routes/Assignments/home";
import AlertsHome from "../routes/Alerts/Home";
import ScheduleHome from "../routes/Schedule/Home";
import ScoresHome from "../routes/Scores/Home";
import DoubtsHome from "../routes/Doubts/Home";
import AttendanceHome from "../routes/Attendance/Home";
import ChartsPerformance from "../routes/Performance/Home";
import ResourcesList from "../routes/Resources/Home";
import ProfileArea from "../routes/Profile/Home";
import SettingsArea from "../routes/Settings/Home";
import ReportForm from "../routes/Report/Home";
import {
  assignmentEditLoader,
  assignmentSingleLoader,
  assignmentSubmissionLoader,
  assignmentSubmitLoader,
  assignmentsHomeLoader,
} from "../loaders/assignments";
import {
  alertsEditLoader,
  alertsHomeLoader,
  alertsSingleLoader,
} from "../loaders/alerts";
import {
  attendancesHomeLoader,
  attendancesNewLoader,
} from "../loaders/attendance";
import { doubtsHome, doubtsSingle } from "../loaders/doubts";
import { performanceHome } from "../loaders/performance";
import { profileEditLoader, profileHomeLoader } from "../loaders/profile";
import { resourceEditLoader, resourcesHomeLoader } from "../loaders/resources";
import {
  scheduleEditLoader,
  scheduleHome,
  scheduleNewLoader,
} from "../loaders/schedule";
import {
  ScoresSingleLoader,
  scoresEditLoader,
  scoresHomeLoader,
  scoresNewLoader,
} from "../loaders/scores";
import AlertsSingle from "../routes/Alerts/Single";
import AssignmentsSingle from "../routes/Assignments/single";
import DoubtsSingle from "../routes/Doubts/Single";
import ScoreSingle from "../routes/Scores/Single";
import AssignmentSubmission from "../routes/Assignments/submissions";
import AssignmentNew from "../routes/Assignments/new";
import {
  assignmentEditAction,
  assignmentNewAction,
  assignmentSubmissionAction,
  assignmentSubmitAction,
} from "../actions/assignments";
import AssignmentEdit from "../routes/Assignments/edit";
import AlertNew from "../routes/Alerts/new";
import { alertEditAction, alertNewAction } from "../actions/alerts";
import AlertEdit from "../routes/Alerts/edit";
import ScheduleNew from "../routes/Schedule/new";
import { scheduleEditAction, scheduleNewAction } from "../actions/schedule";
import ScheduleEdit from "../routes/Schedule/edit";
import ScoresNew from "../routes/Scores/new";
import { scoresEditAction, scoresNewAction } from "../actions/scores";
import ScoresEdit from "../routes/Scores/edit";
import DoubtsNew from "../routes/Doubts/new";
import { doubtNewAction, doubtReplyAction } from "../actions/doubts";
import ResourceNew from "../routes/Resources/new";
import { resourceEditAction, resourceNewAction } from "../actions/resource";
import ResourceEdit from "../routes/Resources/edit";
import AttendanceNew from "../routes/Attendance/new";
import { attendanceNewAction } from "../actions/attendance";
import ProfileEdit from "../routes/Profile/edit";
import { profileEditAction, profileNewAction } from "../actions/profile";
import ProfileNew from "../routes/Profile/new";
import AssignmentSubmit from "../routes/Assignments/submit";

type CustomRouteObject = RouteObject & {
  access?: Array<"student" | "tutor" | "admin">;
  noUI?: boolean;
  ui?: UI | boolean;
};

const createRoutes = (routes: Array<CustomRouteObject>) => routes;

const SUBMISSION_ROUTES = createRoutes([
  {
    path: `${ASSIGNMENT_SLUG}/:id/submit`,
    Component: AssignmentSubmit,
    loader: assignmentSubmitLoader,
    action: assignmentSubmitAction,
    access: ["student", "tutor", "admin"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "#{id}",
    },
  },
  {
    path: `${ASSIGNMENT_SLUG}/:id/submissions`,
    Component: AssignmentSubmission,
    loader: assignmentSubmissionLoader,
    action: assignmentSubmissionAction,
    access: ["student", "tutor", "admin"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "#{id}",
    },
  },
]);

const ASSIGNMENT_ROUTES = createRoutes([
  {
    path: ASSIGNMENT_SLUG,
    Component: AssignmentsHomepage,
    loader: assignmentsHomeLoader,
    access: ["student", "tutor", "admin"],
    ui: {
      backBar: false,
      topBar: true,
      heading: "Assignments",
    },
  },
  {
    path: `${ASSIGNMENT_SLUG}/new`,
    Component: AssignmentNew,
    action: assignmentNewAction,
    access: ["tutor", "admin"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Assignments",
    },
  },
  {
    path: `${ASSIGNMENT_SLUG}/:id`,
    Component: AssignmentsSingle,
    loader: assignmentSingleLoader,
    access: ["student", "tutor", "admin"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "#{id}",
    },
  },
  {
    path: `${ASSIGNMENT_SLUG}/:id/edit`,
    Component: AssignmentEdit,
    loader: assignmentEditLoader,
    action: assignmentEditAction,
    access: ["tutor", "admin"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "#{id}",
    },
  },
]);

const ALERT_ROUTES = createRoutes([
  {
    path: ALERT_SLUG,
    Component: AlertsHome,
    loader: alertsHomeLoader,
    access: ["student", "tutor", "admin"],
    ui: {
      backBar: false,
      topBar: true,
      heading: "Alerts",
    },
  },
  {
    path: `${ALERT_SLUG}/new`,
    Component: AlertNew,
    action: alertNewAction,
    access: ["tutor", "admin"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Alerts",
    },
  },
  {
    path: `${ALERT_SLUG}/:id`,
    Component: AlertsSingle,
    loader: alertsSingleLoader,
    access: ["student", "tutor", "admin"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "#{id}",
    },
  },
  {
    path: `${ALERT_SLUG}/:id/edit`,
    Component: AlertEdit,
    loader: alertsEditLoader,
    action: alertEditAction,
    access: ["student", "tutor", "admin"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "#{id}",
    },
  },
]);

const SCHEDULE_ROUTES = createRoutes([
  {
    path: SCHEDULE_SLUG,
    Component: ScheduleHome,
    loader: scheduleHome,
    access: ["admin", "student", "tutor"],
    ui: {
      backBar: false,
      topBar: true,
      heading: "Schedule",
    },
  },
  {
    path: `${SCHEDULE_SLUG}/edit`,
    Component: ScheduleEdit,
    loader: scheduleEditLoader,
    action: scheduleEditAction,
    access: ["tutor", "admin"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Schedule",
    },
  },
  {
    path: `${SCHEDULE_SLUG}/new`,
    Component: ScheduleNew,
    loader: scheduleNewLoader,
    action: scheduleNewAction,
    access: ["tutor", "admin"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Schedule",
    },
  },
]);

const SCORES_ROUTES = createRoutes([
  {
    path: SCORES_SLUG,
    Component: ScoresHome,
    loader: scoresHomeLoader,
    access: ["admin", "student", "tutor"],
    ui: {
      backBar: false,
      topBar: true,
      heading: "Scores",
    },
  },
  {
    path: `${SCORES_SLUG}/new`,
    Component: ScoresNew,
    loader: scoresNewLoader,
    action: scoresNewAction,
    access: ["admin", "tutor"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Scores",
    },
  },
  {
    path: `${SCORES_SLUG}/:id`,
    Component: ScoreSingle,
    loader: ScoresSingleLoader,
    access: ["admin", "student", "tutor"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "#{id}",
    },
  },
  {
    path: `${SCORES_SLUG}/:id/edit`,
    Component: ScoresEdit,
    action: scoresEditAction,
    loader: scoresEditLoader,
    access: ["admin", "tutor"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "#{id}",
    },
  },
]);

const DOUBTS_ROUTES = createRoutes([
  {
    path: DOUBTS_SLUG,
    Component: DoubtsHome,
    loader: doubtsHome,
    access: ["admin", "student", "tutor"],
    ui: {
      backBar: false,
      topBar: true,
      heading: "Doubts",
    },
  },
  {
    path: `${DOUBTS_SLUG}/new`,
    Component: DoubtsNew,
    action: doubtNewAction,
    access: ["admin", "student", "tutor"],
  },
  {
    path: `${DOUBTS_SLUG}/:id`,
    Component: DoubtsSingle,
    loader: doubtsSingle,
    action: doubtReplyAction,
    access: ["admin", "student", "tutor"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "#{id}",
    },
  },
]);

const ATTENDANCE_ROUTES = createRoutes([
  {
    path: ATTENDANCE_SLUG,
    Component: AttendanceHome,
    loader: attendancesHomeLoader,
    access: ["admin", "student", "tutor"],
    ui: {
      backBar: false,
      topBar: true,
      heading: "Attendance",
    },
  },
  {
    path: `${ATTENDANCE_SLUG}/new`,
    Component: AttendanceNew,
    loader: attendancesNewLoader,
    action: attendanceNewAction,
    access: ["student", "tutor"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Attendance",
    },
  },
]);

const ACCOUNT_ROUTES = createRoutes([
  {
    path: ACCOUNT_SLUG,
    Component: ProfileArea,
    loader: profileHomeLoader,
    access: ["admin", "student", "tutor"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Account",
    },
  },
  {
    path: `${ACCOUNT_SLUG}/edit`,
    Component: ProfileEdit,
    loader: profileEditLoader,
    action: profileEditAction,
    access: ["admin", "student", "tutor"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Account",
    },
  },
  {
    path: `${ACCOUNT_SLUG}/new`,
    Component: ProfileNew,
    action: profileNewAction,
    access: ["admin", "student", "tutor"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Account",
    },
  },
]);

const OTHER_ROUTES = createRoutes([
  {
    path: `${SETTINGS_SLUG}`,
    Component: SettingsArea,
    access: ["admin", "student", "tutor"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Settings",
    },
  },
  {
    path: `${REPORT_SLUG}`,
    Component: ReportForm,
    access: ["admin", "student", "tutor"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Report",
    },
  },
]);

const AUTHENTICATION_ROUTES = createRoutes([
  {
    path: `${LOGIN_SLUG}`,
    action: loginAction,
    loader: loginLoader,
    Component: LoginPage,
    access: ["admin", "student", "tutor"],
    ui: false,
  },
  {
    path: `${RESET_SLUG}`,
    Component: null,
    access: ["admin", "student", "tutor"],
    ui: false,
  },
  {
    path: `${RESET_SLUG}/new`,
    Component: null,
    access: ["admin", "student", "tutor"],
    ui: false,
  },
]);

const PERFORMANCE_ROUTES = createRoutes([
  {
    path: `${PERFORMANCE_SLUG}`,
    Component: ChartsPerformance,
    loader: performanceHome,
    access: ["student", "admin"],
    ui: {
      heading: "Performance",
    },
  },
  { path: `${PERFORMANCE_SLUG}/all`, Component: null, access: ["admin"] },
]);

const RESOURCES_ROUTES = createRoutes([
  {
    path: RESOURCES_SLUG,
    Component: ResourcesList,
    loader: resourcesHomeLoader,
    access: ["admin", "student", "tutor"],
    ui: {
      heading: "Resources",
    },
  },
  {
    path: `${RESOURCES_SLUG}/new`,
    Component: ResourceNew,
    action: resourceNewAction,
    access: ["admin", "tutor"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Resources",
    },
  },
  {
    path: `${RESOURCES_SLUG}/:id/edit`,
    Component: ResourceEdit,
    loader: resourceEditLoader,
    action: resourceEditAction,
    access: ["admin", "tutor"],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "#{id}",
    },
  },
]);

export const allRoutes: CustomRouteObject[] = [
  ...ASSIGNMENT_ROUTES,
  ...SUBMISSION_ROUTES,
  ...ALERT_ROUTES,
  ...SCHEDULE_ROUTES,
  ...SCORES_ROUTES,
  ...DOUBTS_ROUTES,
  ...ATTENDANCE_ROUTES,
  ...PERFORMANCE_ROUTES,
  ...RESOURCES_ROUTES,
  ...ACCOUNT_ROUTES,
  ...OTHER_ROUTES,
  ...AUTHENTICATION_ROUTES,
  {
    index: true,
    Component: MAIN,
    action: async ({ request }: LoaderFunctionArgs) => {
      let formData = await request.formData();

      await new Promise((r) => setTimeout(r, 2000));

      return {
        error: "Error",
        // redirect: "/assignments",
      };
    },
    ui: {
      topBar: true,
      heading: "My App",
    },
  },
];

const routes: RouteObject[] = [
  {
    path: "/",
    loader: authProvider.getUser,
    Component: Layout,
    children: allRoutes,
  },
];

export default createBrowserRouter(routes);
