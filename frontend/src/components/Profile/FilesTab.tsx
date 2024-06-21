import {
  IconButton,
  Popover,
  Typography,
  Button as MuiButton,
} from "@mui/material";
import { format } from "date-fns";
import {
  Block,
  BlockTitle,
  Button,
  Icon,
  Link,
  List,
  ListInput,
  ListItem,
  Page,
  Tab,
  Tabs,
  Toolbar,
  f7,
} from "framework7-react";
import { ListInputProps } from "framework7-react/components/list-input";
import React from "react";
import { useLoaderData } from "react-router-dom";
export function FilesTab({ files }: { files: ProfileFile[] }) {
  return (
    <Tab id="tab-2">
      <Block className=" no-padding">
        <List dividersIos mediaList outlineIos strongIos className="">
          {files.map((data, i) => (
            <ListItem
              key={i}
              link="#"
              footer={format(data.date, "dd MMM, yyyy")}
              header={data.name}
              title={data.title}
              after={data.size}
            >
              <Icon slot="media" material={data.icon} />
            </ListItem>
          ))}
        </List>
      </Block>
    </Tab>
  );
}
