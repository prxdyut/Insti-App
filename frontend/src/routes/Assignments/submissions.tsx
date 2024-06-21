import {
  Block,
  BlockTitle,
  Button,
  Icon,
  Link,
  List,
  ListItem,
  Messagebar,
  MessagebarAttachment,
  MessagebarAttachments,
  Page,
  TextEditor,
  f7,
} from "framework7-react";
import AttachmentFiles from "../../components/Attachment/Files";
import { format } from "date-fns";
import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import FormBuilder from "../../components/Form/Builder";
import useFormHandler from "../../hooks/formHandler";

export default function AssignmentSubmissions() {
  const { submissions } = useLoaderData() as {
    submissions: Submission[];
  };

  const formHandler = useFormHandler();
  return (
    <Page>
      <BlockTitle>Submissions</BlockTitle>
      <Block className="no-padding">
        <List dividersIos mediaList outlineIos strongIos>
          {submissions.map((submission) => (
            <ListItem
              after="17:14 AM"
              title={`${submission.by.firstName} ${submission.by.lastName}`}
            >
              <div
                className="text-sm mb-2"
                dangerouslySetInnerHTML={{
                  __html: submission.description as string,
                }}
              />
              <div className="flex justify-end gap-2 mb-2">
                <AttachmentFiles size="small" files={submission.files || []} />
              </div>
              {submission?.status && (
                <div
                  className={`" ${
                    submission.status == "accepted"
                      ? "bg-green-100"
                      : "bg-red-100"
                  } text-xs  px-2 py-1 rounded "`}
                >
                  <div className="flex justify-between">
                    <div className="font-semibold">
                      {submission?.remark && "Remarks:"}
                    </div>
                    <div
                      className={`${
                        submission.status == "accepted"
                          ? "text-green-800"
                          : "text-red-800"
                      } text-xs font-bold uppercase `}
                    >
                      {submission.status}
                    </div>
                  </div>
                  <div className="italic">{submission?.remark}</div>
                </div>
              )}
              <FormBuilder
                submit="Submit Status"
                structure={[
                  {
                    type: "hidden",
                    name: "submissionId",
                    value: submission._id,
                  },
                  {
                    type: "text",
                    required: true,
                    name: "remark",
                    placeholder: "",
                    label: "Remark",
                  },
                  {
                    type: "option",
                    label: "Status",
                    placeholder: "",
                    options: [
                      { value: "accepted", label: "Accept" },
                      { value: "rejected", label: "Reject" },
                    ],
                    name: "status",
                  },
                ]}
              />
            </ListItem>
          ))}
        </List>
      </Block>
    </Page>
  );
}
