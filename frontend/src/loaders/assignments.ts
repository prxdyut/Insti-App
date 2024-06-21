import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { assignmentsProvider } from "../providers/assignments";
import { authProvider } from "../providers/auth";
import { ASSIGNMENT_SLUG } from "../utils/slugs";
import { submissionsProvider } from "../providers/submissions";

export const assignmentsHomeLoader = async () => {
  await assignmentsProvider.load({});
  await submissionsProvider.load({});

  return {
    user: authProvider.getUser(),
    ...assignmentsProvider.data,
    ...submissionsProvider.data,
  };
};

export const assignmentSingleLoader = async (args: LoaderFunctionArgs) => {
  await assignmentsProvider.load({});
  const id = args.params.id;
  const { assignments } = assignmentsProvider.data;
  const assignment = assignments.find((_) => _.uid === id);
  const searchParams = new URLSearchParams();

  if (assignment) {
    await submissionsProvider.load({});
    const submissions = submissionsProvider.data.submissions.filter(
      (_) => _.assignmentId == assignment.uid
    );

    return {
      user: authProvider.getUser(),
      assignment,
      submissions,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${ASSIGNMENT_SLUG}?${searchParams.toString()}`);
  }
};
export const assignmentEditLoader = async (args: LoaderFunctionArgs) => {
  await assignmentsProvider.load({});
  const id = args.params.id;
  const { assignments } = assignmentsProvider.data;
  const assignment = assignments.find((_) => _.uid === id);
  const searchParams = new URLSearchParams();

  if (assignment) {
    return {
      user: authProvider.getUser(),
      assignment,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${ASSIGNMENT_SLUG}?${searchParams.toString()}`);
  }
};
export const assignmentSubmitLoader = async (args: LoaderFunctionArgs) => {
  await submissionsProvider.load({});
  const id = args.params.id;
  const submissions = submissionsProvider.data.submissions.filter(
    (_) => _.assignmentId == id
  );
  const searchParams = new URLSearchParams();

  if (id) {
    return {
      user: authProvider.getUser(),
      submissions,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${ASSIGNMENT_SLUG}?${searchParams.toString()}`);
  }
};

export const assignmentSubmissionLoader = async (args: LoaderFunctionArgs) => {
  await submissionsProvider.load({});
  const id = args.params.id;
  const submissions = submissionsProvider.data.submissions.filter(
    (_) => _.assignmentId == id
  );
  const searchParams = new URLSearchParams();

  if (id) {
    return {
      user: authProvider.getUser(),
      submissions,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${ASSIGNMENT_SLUG}?${searchParams.toString()}`);
  }
};
