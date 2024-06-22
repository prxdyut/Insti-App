import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { assignmentsProvider } from "../providers/assignments";
import { authProvider } from "../providers/auth";
import { ASSIGNMENT_SLUG } from "../utils/slugs";
import { submissionsProvider } from "../providers/submissions";

export const assignmentsHomeLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }

  await assignmentsProvider.load({});
  await submissionsProvider.load({});

  return {
    user: await authProvider.getUser(args),
    ...assignmentsProvider.data,
    ...submissionsProvider.data,
  };
};

export const assignmentsNewLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await assignmentsProvider.load({});
  await submissionsProvider.load({});

  return {
    user: await authProvider.getUser(args),
    ...assignmentsProvider.data,
    ...submissionsProvider.data,
  };
};

export const assignmentSingleLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
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
      user: await authProvider.getUser(args),
      assignment,
      submissions,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${ASSIGNMENT_SLUG}?${searchParams.toString()}`);
  }
};

export const assignmentEditLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await assignmentsProvider.load({});
  const id = args.params.id;
  const { assignments } = assignmentsProvider.data;
  const assignment = assignments.find((_) => _.uid === id);
  const searchParams = new URLSearchParams();

  if (assignment) {
    return {
      user: await authProvider.getUser(args),
      assignment,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${ASSIGNMENT_SLUG}?${searchParams.toString()}`);
  }
};
export const assignmentSubmitLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await submissionsProvider.load({});
  const id = args.params.id;
  const submissions = submissionsProvider.data.submissions.filter(
    (_) => _.assignmentId == id
  );
  const searchParams = new URLSearchParams();

  if (id) {
    return {
      user: await authProvider.getUser(args),
      submissions,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${ASSIGNMENT_SLUG}?${searchParams.toString()}`);
  }
};

export const assignmentSubmissionLoader = async (args: LoaderFunctionArgs) => {
  try {
    await authProvider.checkAuth(args);
  } catch (err) {
    const searchParams = new URLSearchParams();
    searchParams.set("error", err as string);
    return redirect("/login?" + searchParams.toString());
  }
  await submissionsProvider.load({});
  const id = args.params.id;
  const submissions = submissionsProvider.data.submissions.filter(
    (_) => _.assignmentId == id
  );
  const searchParams = new URLSearchParams();

  if (id) {
    return {
      user: await authProvider.getUser(args),
      submissions,
    };
  } else {
    searchParams.set("error", "invalid-id");
    return redirect(`/${ASSIGNMENT_SLUG}?${searchParams.toString()}`);
  }
};
