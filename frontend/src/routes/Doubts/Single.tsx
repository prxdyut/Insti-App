import {
  Block,
  Button,
  List,
  ListItem,
  Page,
  Link,
  Messagebar,
  MessagebarAttachments,
  MessagebarAttachment,
  Icon,
  f7,
} from "framework7-react";
import React, { useRef, useState } from "react";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import AttachmentFiles from "../../components/Attachment/Files";
import { format } from "date-fns";
import subjects from "../../utils/subjects";
import {
  modifyDoubtReply,
  modifyDoubtReplyListener,
} from "../../events/doubtsReplyTo";
import ConditionalButton from "../../components/Admin/Button";

export default function DoubtDetails() {
  const { doubt, user } = useLoaderData() as { doubt: Doubt , user: User};

  return (
    <Page>
      <style>
        {`
          .doubtDetails p {
            margin: 0px;
          }
          .doubtDetails hr {
            margin-block: 8px;
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
        <div className="text-xl font-semibold mb-4">{doubt.title}</div>
        <div className="text-xs mb-1">{format(doubt.date, "dd MMM, yyyy")}</div>
        <div className="text-base mb-2 capitalize">
          {subjects()[doubt.subject]}
        </div>
        <div
          className="doubtDetails mb-4"
          dangerouslySetInnerHTML={{ __html: doubt.description }}
        />
        <AttachmentFiles size="big" files={[]} />
      </Block>
      <List dividersIos mediaList outlineIos strongIos>
        <ListItem className="reply" title="Pradyut Das" after="17:14 AM">
          <div className="text-sm mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt.
            Cras dolor metus, ultrices condimentum sodales sit amet, pharetra
            sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec
            dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar
            lacus.
          </div>
          <div className="flex justify-end gap-2">
            <AttachmentFiles size="small" files={[]} />
            <Button
              fill
              className="w-max"
              small
              onClick={() =>
                modifyDoubtReply({
                  id: "GU776877869",
                  name: "Pradyut Das",
                })
              }
            >
              Reply
            </Button>
          </div>
          <div className=" replies -mr-6">
            <ListItem className="reply" title="Pradyut Das" after="17:14 AM">
              <div className="text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                sagittis tellus ut turpis condimentum, ut dignissim lacus
                tincidunt.
              </div>
              <div className="flex justify-end gap-2">
                <AttachmentFiles size="small" files={[]} />
                <Button
                  fill
                  className="w-max"
                  small
                  onClick={() =>
                    modifyDoubtReply({
                      id: "GU776877869",
                      name: "Pradyut Das",
                    })
                  }
                >
                  Reply
                </Button>
              </div>
            </ListItem>
            <ListItem className="reply" title="Pradyut Das" after="17:14 AM">
              <div className="text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                sagittis tellus ut turpis condimentum, ut dignissim lacus
                tincidunt.
              </div>
              <div className="flex justify-end gap-2">
                <AttachmentFiles size="small" files={[]} />
                <Button
                  fill
                  className="w-max"
                  small
                  onClick={() =>
                    modifyDoubtReply({
                      id: "GU776877869",
                      name: "Pradyut Das",
                    })
                  }
                >
                  Reply
                </Button>
              </div>
            </ListItem>
            <ListItem className="reply" title="Pradyut Das" after="17:14 AM">
              <div className="text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                sagittis tellus ut turpis condimentum, ut dignissim lacus
                tincidunt.
              </div>
              <div className="flex justify-end gap-2">
                <AttachmentFiles size="small" files={[]} />
                <Button
                  fill
                  className="w-max"
                  small
                  onClick={() =>
                    modifyDoubtReply({
                      id: "GU776877869",
                      name: "Pradyut Das",
                    })
                  }
                >
                  Reply
                </Button>
              </div>
            </ListItem>
          </div>
        </ListItem>
      </List>
      <ReplySection />
    </Page>
  );
}

type FilePreview = { raw: File; preview?: string; id: number };

const ReplySection = () => {
  const [attachments, setAttachments] = useState<FileRef[]>([]);
  const [messageText, setMessageText] = useState("");
  const [replyTo, setReplyTo] = useState<DoubtReplyReference>({
    id: null,
    name: null,
  });

  modifyDoubtReplyListener(setReplyTo);

  const attachmentsVisible = attachments.length > 0;
  const placeholder = "Reply";

  const isImageFile = (file: { type: string }) =>
    file?.type?.startsWith("image/") ||
    file?.type?.includes("jpeg") ||
    file?.type?.includes("jpg") ||
    file?.type?.includes("png");

  const readFileAsDataURL = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  function formatFileSize(bytes: number) {
    const KB = 1024;
    const MB = KB * 1024;

    if (bytes >= MB) {
      const sizeInMB = Math.round(bytes / MB).toFixed(2);
      return `${sizeInMB} MB`;
    } else {
      const sizeInKB = (bytes / KB).toFixed(2);
      return `${sizeInKB} KB`;
    }
  }

  const addAttachment = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;

    fileInput.addEventListener("change", async (event: any) => {
      const files = Array.from(event.target.files) as File[];
      const filesArray: FileRef[] = [];
      const dialog = f7.dialog.progress("Uploading Files", 0);

      for (const [index, file] of files.entries()) {
        try {
          const fileName = "" + Math.round(Math.random() * 10000000);
          const fileTitle = "" + Math.round(Math.random() * 10000000);

          dialog.setText(`File ${index + 1} of ${files.length}`);
          const previewUrl = isImageFile(file)
            ? await readFileAsDataURL(file)
            : "/preview exampul";

          await new Promise((resolve) => {
            let progress = 0;
            const interval = setInterval(() => {
              progress += 10;
              dialog.setProgress(progress);
              if (progress === 100) clearInterval(interval);
            }, 100);
            setTimeout(resolve, 1000);
          });

          filesArray.push({
            _id: `FI${Math.round(Math.random() * 10000)}`,
            url: previewUrl as string,
            size: formatFileSize(file.size),
            type: file.type,
            name: file.name,
          });
        } catch (error) {
          console.error("Error reading file:", file.name, error);
        }
      }

      dialog.close();

      if (files.length > 0) {
        setAttachments((prev) => [...prev, ...filesArray]);
      }
    });

    fileInput.click();
  };

  const deleteAttachment = (attachment: FileRef) => () => {
    setAttachments((prev) =>
      prev.filter((item) => item._id !== attachment._id)
    );
  };

  const imageAttachments = attachments.filter((attachment) =>
    isImageFile({ type: attachment.type as string })
  );
  const fileAttachments = attachments.filter(
    (attachment) => !isImageFile({ type: attachment.type as string })
  );

  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();
  const sendMessage = () => submit(formRef.current);

  let extraSpace = 0;
  if (fileAttachments) extraSpace = extraSpace + 30;
  if (replyTo.name) extraSpace = extraSpace + 30;

  return (
    <>
      <div style={{ height: extraSpace }} />
      <div
        style={{ position: "fixed", paddingBottom: '.5rem', zIndex: 1500 }}
        className=" fixed bottom-0 left-0 w-full bg-white"
      >
        <Form ref={formRef} method="post" replace>
          {attachments.map((_) => (
            <input type="hidden" name={"files_url"} value={_.url} />
          ))}
          {attachments.map((_) => (
            <input type="hidden" name={"files_size"} value={_.size} />
          ))}
          {attachments.map((_) => (
            <input type="hidden" name={"files_name"} value={_.name} />
          ))}
          {attachments.map((_) => (
            <input type="hidden" name={"files_type"} value={_.type} />
          ))}
          {replyTo.name && (
            <input
              type="hidden"
              name={"replyTo"}
              value={replyTo.id as string}
            />
          )}
          <input type="hidden" name={"description"} value={messageText} />
        </Form>
        <div
          className={`bg-gray-200 px-2 py-1 flex justify-between ${
            !replyTo.name && "hidden"
          }`}
        >
          <span>
            Replying to <span className="font-semibold">{replyTo.name}</span>
          </span>
          <Link
            onClick={() => {
              setReplyTo({ id: null, name: null });
            }}
            iconMaterial="close"
            iconSize={16}
          />
        </div>
        <div
          className={`" overflow-auto px-4 pt-2 flex flex-row gap-2 bg-white " ${
            !fileAttachments.length && "hidden"
          }`}
        >
          {fileAttachments.map((attachment) => (
            <div
              className={`bg-gray-200 px-3 py-2 h-fit min-w-[75vw] flex justify-between ${""} rounded-lg`}
            >
              <span>
                File: <strong className=" break-all">{attachment.name}</strong>{" "}
              </span>
              <div className=" flex gap-2 pl-2">
                <Link iconMaterial="open_in_new" iconSize={16} />
                <Link
                  iconMaterial="close"
                  iconSize={16}
                  onClick={deleteAttachment(attachment)}
                />
              </div>
            </div>
          ))}
        </div>
        <Messagebar
          placeholder={placeholder}
          attachmentsVisible={attachmentsVisible}
          value={messageText}
          onInput={(e) => setMessageText(e.target.value)}
          name="description"
          style={{ paddingInline: ".25rem" }}
        >
          <Link
            iconMaterial="attach_file"
            slot="inner-start"
            onClick={addAttachment}
          />
          <Link
            iconIos="f7:arrow_up_circle_fill"
            iconMd="material:send"
            slot="inner-end"
            onClick={sendMessage}
          />
          <MessagebarAttachments>
            {imageAttachments.map((attachment, index) => (
              <MessagebarAttachment
                key={index}
                image={attachment.url}
                onAttachmentDelete={deleteAttachment(attachment)}
              />
            ))}
          </MessagebarAttachments>
        </Messagebar>
      </div>
    </>
  );
};
