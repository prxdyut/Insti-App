import { Block, Button, Icon, Page } from "framework7-react";
import React from "react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import AttachmentFiles from "../../components/Attachment/Files";
import { format } from "date-fns";
import subjects from "../../utils/subjects";

export default function AssignmentsSingle() {
  const { assignment, submissions } = useLoaderData() as {
    assignment: Assignment;
    submissions: Submission[];
  };

  console.log(submissions)
  
  const navigateTo = useNavigate();
  const location = useLocation();

  return (
    <Page>
      <style>
        {`
          .assignmentBody p{
            margin-block: 4px;
          }
          .assignmentBody hr{
            margin-block: 8px;
          }
          ol {
              list-style: disc;
    margin-left: 1rem;
          }
          `}
      </style>
      <Block>
        <div className=" text-xl font-semibold mb-4">{assignment.title}</div>
        <div className=" text-sm mb-1">
          <span>{format(assignment.date.start, "dd MMM, yyyy")}</span>
          &nbsp; <Icon material="arrow_forward" size={16} className="mb-1" />
          &nbsp;
          <span>{format(assignment.date.end, "dd MMM, yyyy")}</span>
        </div>
        <div className=" text-xs mb-1">{`${assignment.by.firstName} ${assignment.by.lastName}`}</div>
        <div className=" text-base mb-4 capitalize">
          {subjects()[assignment.subject]}
        </div>
        <div
          className=" assignmentBody mb-4"
          dangerouslySetInnerHTML={{ __html: assignment.description }}
        />
        <AttachmentFiles
          size="big"
          className=" mb-2"
          files={assignment.files}
        />
        <Button
          fill
          large
          onClick={() => navigateTo(location.pathname + "/submit")}
        >
          {submissions.length ? "Submissions" : "Submit"}
        </Button>
      </Block>
    </Page>
  );
}
