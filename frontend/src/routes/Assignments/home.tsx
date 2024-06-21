import { Page } from "framework7-react";
import { useLoaderData } from "react-router-dom";
import AssignmentsList from "../../components/Assignments/List";

export default function AssignmentsHomepage() {
  const data = useLoaderData() as {
    assignments: Assignment[];
    submissions: Submission[];
  };

  return (
    <Page>
      {/* <BlockTitle>Assignments</BlockTitle> */}
      <AssignmentsList {...data} />
    </Page>
  );
}
