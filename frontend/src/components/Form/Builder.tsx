import { Collapse } from "@mui/material";
import {
  Block,
  Button,
  Icon,
  Link,
  List,
  ListInput,
  Range,
} from "framework7-react";
import React, { useState } from "react";

import {
  BlockTitle,
  ListItem,
  Messagebar,
  MessagebarAttachment,
  MessagebarAttachments,
  Page,
  TextEditor,
  f7,
} from "framework7-react";
import { format } from "date-fns";
import subjects from "../../utils/subjects";
import { Form } from "react-router-dom";
import { useLocalData } from "../../hooks/localData";

export default function FormBuilder({
  structure,
  submit,
}: {
  structure: FormBuilder[];
  submit: string;
}) {
  const { localData } = useLocalData();

  return (
    <div className=" no-padding formBuilder" key={structure.length}>
      <style>{`
        .formBuilder .list{
        margin: 0px !important;
        }
        .formBuilder ul {
    padding-left: 0px !important;
}
        `}</style>
      <Form method="post" replace>
        {structure.map((input, i) => {
          switch (input.type) {
            case "hr":
              return <hr />;
            case "block":
              return <BlockTitle>{input.label}</BlockTitle>;
            case "text":
              return (
                <List strongIos dividersIos insetIos>
                  <ListInput {...input} clearButton />
                </List>
              );
            case "number":
              return (
                <List strongIos dividersIos insetIos>
                  <ListInput {...input} clearButton />
                </List>
              );
            case "textarea":
              return (
                <List strongIos dividersIos insetIos>
                  <ListInput {...input} clearButton />
                </List>
              );
            case "date":
              return (
                <List strongIos dividersIos insetIos>
                  <ListInput {...input} />
                </List>
              );
            case "time":
              return (
                <List strongIos dividersIos insetIos>
                  <ListInput {...input} />
                </List>
              );
            case "subject":
              return <SubjectSelector {...input} />;
            case "button":
              return <ButtonEditor {...input} />;
            case "files":
              return <FilesUploader {...input} />;
            case "option":
              return <Options {...input} />;
            case "editor":
              return <TextEdit {...input} />;
            case "hidden":
              return <input {...input} />;
          }
        })}
        <input type="hidden" name="class" value={localData?.class} />

        {/* {_} edits needed {_} */}
        {Boolean(structure.length) && <div className=" flex justify-end mx-4 gap-2">
          <Button type="reset" className=" w-min" outline>
            Reset
          </Button>
          <Button type="submit" className=" w-min" fill>
            {submit}
          </Button>
        </div>}
      </Form>
    </div>
  );
}

function TextEdit(props: {
  placeholder: string;
  name: string;
  value?: string;
}) {
  const [value, setValue] = useState(props?.value || "");
  return (
    <div>
      <input type="hidden" name={props.name} value={value} />
      <TextEditor
        placeholder={props.placeholder}
        value={value}
        onTextEditorChange={setValue}
        mode="keyboard-toolbar"
        // @ts-ignore
        style={{ "--f7-text-editor-height": "150px" }}
      />
    </div>
  );
}

function Options(props: {
  placeholder: string;
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <List className=" capitalize">
      <List strongIos dividersIos insetIos></List>
      <ListInput {...props} type="select">
        {props.options.map((option) => (
          <option className=" capitalize" value={option.value}>
            {option.label}
          </option>
        ))}
      </ListInput>
    </List>
  );
}

function ButtonEditor(props: {
  labelLabel: string;
  labelValue?: string;
  linkLabel: string;
  linkValue?: string;
}) {
  const [button, setButton] = useState({ label: props.labelValue, url: props.linkValue });

  return (
    <div className=" mx-4 my-3 border-2 rounded-lg buttonEditor">
      <style>
        {`
           .buttonEditor .item-content.item-input.item-input-outline,.buttonEditor .list  {
    margin: 0px !important;
}
            `}
      </style>
      <input type="hidden" name="button_label" value={button.label} />
      <input type="hidden" name="button_url" value={button.url} />
      <div className=" flex gap-2">
        <Button
          fill
          className=" flex-1"
          onClick={() => {
            button.url ? window.open(button.url) : null;
          }}
          large
        >
          {button.label}
        </Button>
        <div />
        <Link
          iconMaterial="edit"
          className=" px-2 rounded-full "
          onClick={() => {
            f7.dialog.prompt(props.labelLabel, (label) =>
              setButton((_) => ({ ..._, label }))
            );
          }}
        />
        <Link
          iconMaterial="link"
          className=" px-2 rounded-full "
          onClick={() => {
            f7.dialog.prompt(props.linkLabel, (link) =>
              setButton((_) => ({ ..._, link }))
            );
          }}
        />
      </div>
    </div>
  );
}

function FilesUploader(props: {
  label: string;
  name?: string;
  value?: FileRef[];
  single?: boolean;
}) {
  const [attachments, setAttachments] = useState<FileRef[]>(props.value || []);

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
    fileInput.multiple = !Boolean(props.single);

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
        if (props.single) setAttachments((prev) => filesArray);
        else setAttachments((prev) => [...prev, ...filesArray]);
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

  const attr = props?.name ? props.name + "_" : "";
  return (
    <div className="my-3 mx-4 border rounded-lg">
      {attachments.map((_) => (
        <input type="hidden" name={attr + "files_url"} value={_.url} />
      ))}
      {attachments.map((_) => (
        <input type="hidden" name={attr + "files_size"} value={_.size} />
      ))}
      {attachments.map((_) => (
        <input type="hidden" name={attr + "files_name"} value={_.name} />
      ))}
      {attachments.map((_) => (
        <input type="hidden" name={attr + "files_type"} value={_.type} />
      ))}
      {imageAttachments.length > 0 && (
        <div className="pb-4">
          <MessagebarAttachments>
            {imageAttachments.map((attachment, index) => (
              <MessagebarAttachment
                key={index}
                image={attachment.url}
                onAttachmentDelete={deleteAttachment(attachment)}
              />
            ))}
          </MessagebarAttachments>
        </div>
      )}
      {fileAttachments.length > 0 && (
        <div className="pb-4">
          <List
            dividersIos
            mediaList
            outlineIos
            strongIos
            style={{ margin: 0 }}
          >
            {fileAttachments.map((data, i) => (
              <ListItem
                className="rounded-xl"
                key={i}
                header={data.size}
                title={data.name}
              >
                <Icon slot="media" material={"grid_on"} />
                <Link
                  slot="after"
                  iconMaterial="open_in_new"
                  className="ml-2"
                />
                <Link
                  slot="after"
                  iconMaterial="cancel"
                  className="ml-2"
                  onClick={deleteAttachment(data)}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
      <Button tonal onClick={addAttachment}>
        <Icon material="upload" className=" mr-2" size={16} />
        {props.label}
      </Button>
    </div>
  );
}

function SubjectSelector(props: {
  placeholder?: string;
  required: boolean;
  label?: string;
  value?: number;
}) {
  const [value, setValue] = useState(props.value || -1);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <List className=" capitalize">
      <input type="hidden" name={"subject"} value={value} />
      <ListInput
        label={props.label || "Subject"}
        placeholder={props.placeholder}
        required={props.required}
        type="select"
        value={subjects().map(capitalizeFirstLetter)[value]}
        onChange={(_) =>
          setValue(
            subjects().map(capitalizeFirstLetter).indexOf(_.target.value)
          )
        }
      >
        {subjects()
          .map(capitalizeFirstLetter)
          .map((subject) => (
            <option className=" capitalize" value={subject}>
              {subject}
            </option>
          ))}
      </ListInput>
    </List>
  );
}
