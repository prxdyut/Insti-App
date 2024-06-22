import { Page } from "framework7-react";
import { useLoaderData } from "react-router-dom";
import AssignmentsList from "../../components/Assignments/List";
import ConditionalButton from "../../components/Admin/Button";

export default function AssignmentsHomepage() {
  const data = useLoaderData() as {
    user: User;
    assignments: Assignment[];
    submissions: Submission[];
  };

  return (
    <Page>
      <ConditionalButton
        user={data.user}
        className="px-4 flex justify-end mt-2 -mb-5"
        label="New Assignment"
        navigate="./new"
      />
      {/* <BlockTitle>Assignments</BlockTitle> */}
      <AssignmentsList {...data} />
    </Page>
  );
}
