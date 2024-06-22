import { Block, Button, Page } from "framework7-react";
import React from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import AttachmentFiles from "../../components/Attachment/Files";
import { format } from "date-fns";
import ConditionalButton from "../../components/Admin/Button";

export default function AlertsSingle() {
  const { alert, user } = useLoaderData() as { alert: Alert; user: User };
  const navigateTo = useNavigate();

  return (
    <Page>
      <style>
        {`
          .alertBody p{
            margin: 0px;
          }
          .alertBody hr{
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
        <div className=" text-xl font-semibold mb-4">{alert.title}</div>
        <div className=" text-xs mb-1">
          {format(alert.date, "dd MMM, yyyy")}
        </div>
        <div className=" text-base mb-4">{alert.summary}</div>
        <div
          className=" alertBody mb-2"
          dangerouslySetInnerHTML={{ __html: alert.description }}
        />
        {alert.files && (
          <div className=" mt-4">
            <AttachmentFiles size="big" files={alert.files} />
          </div>
        )}
        <div className=" flex gap-2 mt-4">
          {alert.button && alert.button.link && alert.button.label && (
            <Button
              fill
              className=" flex-1"
              onClick={() => navigateTo(String(alert.button?.link))}
            >
              {alert.button.label}
            </Button>
          )}
        </div>
      </Block>
    </Page>
  );
}
