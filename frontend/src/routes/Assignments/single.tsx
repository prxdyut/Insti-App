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
import ConditionalButton from "../../components/Admin/Button";

export default function AssignmentsSingle() {
  const { assignment, submissions, user } = useLoaderData() as {
    assignment: Assignment;
    submissions: Submission[];
    user: User;
  };

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
      <div className=" flex">
          <ConditionalButton
            user={user}
            className="mb-4"
            label="Edit"
            navigate="./edit"
            buttonProps={{ small: true }}
          />
        </div>
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
        <ConditionalButton
          student
          buttonProps={{large: true}}
          user={user}
          className="mt-2 -mb-5"
          label="Submit"
          navigate="./submit"
        />
        <ConditionalButton
          user={user}
          className="mt-2 -mb-5"
          label="All Submissions"
          navigate="./submissions"
        />
      </Block>
    </Page>
  );
}
