import {
  RouteObject,
  createBrowserRouter,
} from "react-router-dom";

import * as slugs from "./slugs";
import * as loaders from "./loaders";
import * as components from "./components";
import * as actions from "./actions";

const createRoutes = (routes: Array<CustomRouteObject>) => routes;

const SUBMISSION_ROUTES = createRoutes([
  {
    path: `/${slugs.ASSIGNMENT_SLUG}/:id/submit`,
    Component: components.AssignmentSubmit,
    loader: loaders.assignmentSubmitLoader,
    action: actions.assignmentSubmitAction,
    access: [0, 1, 2],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: `#{id}`,
    },
  },
  {
    path: `/${slugs.ASSIGNMENT_SLUG}/:id/submissions`,
    Component: components.AssignmentSubmission,
    loader: loaders.assignmentSubmissionLoader,
    action: actions.assignmentSubmissionAction,
    access: [1, 2],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: `#{id}`,
    },
  },
]);

const ASSIGNMENT_ROUTES = createRoutes([
  {
    path: `/${slugs.ASSIGNMENT_SLUG}`,
    Component: components.AssignmentsHomepage,
    loader: loaders.assignmentsHomeLoader,
    access: [0, 1, 2],
    ui: {
      backBar: false,
      topBar: true,
      heading: "Assignments",
    },
  },
  {
    path: `/${slugs.ASSIGNMENT_SLUG}/new`,
    Component: components.AssignmentNew,
    loader: loaders.assignmentsNewLoader,
    action: actions.assignmentNewAction,
    access: [1, 2],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Assignments",
    },
  },
  {
    path: `/${slugs.ASSIGNMENT_SLUG}/:id`,
    Component: components.AssignmentsSingle,
    loader: loaders.assignmentSingleLoader,
    access: [0, 1, 2],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: `#{id}`,
    },
  },
  {
    path: `/${slugs.ASSIGNMENT_SLUG}/:id/edit`,
    Component: components.AssignmentEdit,
    loader: loaders.assignmentEditLoader,
    action: actions.assignmentEditAction,
    access: [1, 2],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: `#{id}`,
    },
  },
]);

const ALERT_ROUTES = createRoutes([
  {
    path: `/${slugs.ALERT_SLUG}`,
    Component: components.AlertsHome,
    loader: loaders.alertsHomeLoader,
    access: [0, 1, 2],
    ui: {
      backBar: false,
      topBar: true,
      heading: "Alerts",
    },
  },
  {
    path: `/${slugs.ALERT_SLUG}/new`,
    Component: components.AlertNew,
    loader: loaders.alertNewLoader,
    action: actions.alertNewAction,
    access: [1, 2],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Alerts",
    },
  },
  {
    path: `/${slugs.ALERT_SLUG}/:id`,
    Component: components.AlertsSingle,
    loader: loaders.alertsSingleLoader,
    access: [0, 1, 2],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: `#{id}`,
    },
  },
  {
    path: `/${slugs.ALERT_SLUG}/:id/edit`,
    Component: components.AlertEdit,
    loader: loaders.alertsEditLoader,
    action: actions.alertEditAction,
    access: [0, 1, 2],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: `#{id}`,
    },
  },
]);

const SCHEDULE_ROUTES = createRoutes([
  {
    path: `/${slugs.SCHEDULE_SLUG}`,
    Component: components.ScheduleHome,
    loader: loaders.scheduleHome,
    access: [2, 0, 1],
    ui: {
      backBar: false,
      topBar: true,
      heading: "Schedule",
    },
  },
  {
    path: `/${slugs.SCHEDULE_SLUG}/edit`,
    Component: components.ScheduleEdit,
    loader: loaders.scheduleEditLoader,
    action: actions.scheduleEditAction,
    access: [1, 2],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Schedule",
    },
  },
  {
    path: `/${slugs.SCHEDULE_SLUG}/new`,
    Component: components.ScheduleNew,
    loader: loaders.scheduleNewLoader,
    action: actions.scheduleNewAction,
    access: [1, 2],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Schedule",
    },
  },
]);

const SCORES_ROUTES = createRoutes([
  {
    path: `/${slugs.SCORES_SLUG}`,
    Component: components.ScoresHome,
    loader: loaders.scoresHomeLoader,
    access: [2, 0, 1],
    ui: {
      backBar: false,
      topBar: true,
      heading: "Scores",
    },
  },
  {
    path: `/${slugs.SCORES_SLUG}/new`,
    Component: components.ScoresNew,
    loader: loaders.scoresNewLoader,
    action: actions.scoresNewAction,
    access: [2, 1],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Scores",
    },
  },
  {
    path: `/${slugs.SCORES_SLUG}/:id`,
    Component: components.ScoreSingle,
    loader: loaders.ScoresSingleLoader,
    access: [2, 0, 1],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: `#{id}`,
    },
  },
  {
    path: `/${slugs.SCORES_SLUG}/:id/edit`,
    Component: components.ScoresEdit,
    action: actions.scoresEditAction,
    loader: loaders.scoresEditLoader,
    access: [2, 1],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: `#{id}`,
    },
  },
]);

const DOUBTS_ROUTES = createRoutes([
  {
    path: `/${slugs.DOUBTS_SLUG}`,
    Component: components.DoubtsHome,
    loader: loaders.doubtsHomeLoader,
    access: [2, 0, 1],
    ui: {
      backBar: false,
      topBar: true,
      heading: "Doubts",
    },
  },
  {
    path: `/${slugs.DOUBTS_SLUG}/new`,
    Component: components.DoubtsNew,
    action: actions.doubtNewAction,
    loader: loaders.doubtsNewLoader,
    access: [2, 0, 1],
  },
  {
    path: `/${slugs.DOUBTS_SLUG}/:id`,
    Component: components.DoubtsSingle,
    loader: loaders.doubtsSingleLoader,
    action: actions.doubtReplyAction,
    access: [2, 0, 1],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: `#{id}`,
    },
  },
]);

const ATTENDANCE_ROUTES = createRoutes([
  {
    path: `/${slugs.ATTENDANCE_SLUG}`,
    Component: components.AttendanceHome,
    loader: loaders.attendancesHomeLoader,
    access: [2, 0, 1],
    ui: {
      backBar: false,
      topBar: true,
      heading: "Attendance",
    },
  },
  {
    path: `/${slugs.ATTENDANCE_SLUG}/new`,
    Component: components.AttendanceNew,
    loader: loaders.attendancesNewLoader,
    action: actions.attendanceNewAction,
    access: [0, 1],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Attendance",
    },
  },
]);

const ACCOUNT_ROUTES = createRoutes([
  {
    path: `/${slugs.ACCOUNT_SLUG}`,
    Component: components.ProfileArea,
    loader: loaders.profileHomeLoader,
    access: [2, 0, 1],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Account",
    },
  },
  {
    path: `/${slugs.ACCOUNT_SLUG}/edit`,
    Component: components.ProfileEdit,
    loader: loaders.profileEditLoader,
    action: actions.profileEditAction,
    access: [2, 0, 1],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Account",
    },
  },
  {
    path: `/${slugs.ACCOUNT_SLUG}/new`,
    Component: components.ProfileNew,
    loader: loaders.profileNewLoader,
    action: actions.profileNewAction,
    access: [2, 0, 1],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Account",
    },
  },
]);

const OTHER_ROUTES = createRoutes([
  {
    path: `/${slugs.SETTINGS_SLUG}`,
    Component: components.SettingsArea,
    loader: loaders.authLoader,
    access: [2, 0, 1],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Settings",
    },
  },
  {
    path: `/${slugs.REPORT_SLUG}`,
    Component: components.ReportForm,
    loader: loaders.authLoader,
    access: [2, 0, 1],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Report",
    },
  },
]);

const AUTHENTICATION_ROUTES = createRoutes([
  {
    path: `/${slugs.LOGIN_SLUG}`,
    action: actions.loginAction,
    Component: components.LoginPage,
    access: [2, 0, 1],
    ui: false,
  },
  {
    path: `/${slugs.RESET_SLUG}`,
    Component: null,
    access: [2, 0, 1],
    ui: false,
  },
  {
    path: `/${slugs.RESET_SLUG}/new`,
    Component: null,
    access: [2, 0, 1],
    ui: false,
  },
  {
    path: `signout`,
    loader: loaders.signoutLoader,
    Component: null,
    access: [2, 1, 0],
  },
]);

const PERFORMANCE_ROUTES = createRoutes([
  {
    path: `/${slugs.PERFORMANCE_SLUG}`,
    Component: components.ChartsPerformance,
    loader: loaders.performanceHome,
    access: [0, 1, 2],
    ui: {
      heading: "Performance",
    },
  },
]);

const RESOURCES_ROUTES = createRoutes([
  {
    path: `/${slugs.RESOURCES_SLUG}`,
    Component: components.ResourcesList,
    loader: loaders.resourcesHomeLoader,
    access: [2, 0, 1],
    ui: {
      heading: "Resources",
    },
  },
  {
    path: `/${slugs.RESOURCES_SLUG}/new`,
    Component: components.ResourceNew,
    loader: loaders.resourcesNewLoader,
    action: actions.resourceNewAction,
    access: [2, 1],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: "Resources",
    },
  },
  {
    path: `/${slugs.RESOURCES_SLUG}/:id/edit`,
    Component: components.ResourceEdit,
    loader: loaders.resourceEditLoader,
    action: actions.resourceEditAction,
    access: [2, 1],
    ui: {
      backBar: true,
      bottomBar: false,
      heading: `#{id}`,
    },
  },
]);

export const allRoutes = [
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
    Component: components.MAIN,
  },
]

const routes: RouteObject[] = [
  {
    Component: components.Layout,
    children: allRoutes,
  },
];

export default createBrowserRouter(routes);
