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

export default function AssignmentSubmit() {
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
            <ListItem after="17:14 AM">
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
                <div className={`" ${submission.status == 'accepted' ? 'bg-green-100' : 'bg-red-100'} text-xs  px-2 py-1 rounded "`}>
                  <div className="flex justify-between">
                    <div className="font-semibold">{submission?.remark && "Remarks:"}</div>
                    <div className={`${submission.status == 'accepted' ? 'text-green-800' : 'text-red-800'} text-xs font-bold uppercase `}>
                      {submission.status}
                    </div>
                  </div>
                  <div className="italic">{submission?.remark}</div>
                </div>
              )}
            </ListItem>
          ))}
        </List>
      </Block>
      <BlockTitle>Submit</BlockTitle>
      <FormBuilder
        submit="Submit Assignment"
        structure={[
          {
            type: "editor",
            required: true,
            name: "description",
            placeholder: "Description of Submission",
          },
          {
            type: "files",
            label: "Upload Files",
          },
        ]}
      />
    </Page>
  );
}
